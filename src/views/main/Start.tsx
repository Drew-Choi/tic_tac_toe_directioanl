import React, { useCallback, useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useRecoilValue } from 'recoil';
import { gameCondition, groundDataSet } from '../../recoil/gameCondition';
import { playerInfoChangeIcon } from '../../recoil/player';
import CheckBox from './Start_Components/CheckBox';
import checkVictory from '../../utils/checkVictory';
import { nowDayAndTimeOnlyNumber } from '../../utils/generateDate';

const Start = () => {
  // 게임 종료 여부
  const [isEndGame, setIsEndGame] = useState<CheckVictoryReturnType>({
    win: false,
    victoryPosition: [],
  });

  // 초기 그라운드 데이터 셋
  const groundDataOrigin = useRecoilValue(groundDataSet);
  const [groundData, setGroundData] = useState<GroundDataType | null | undefined>(groundDataOrigin);

  // 그라운드 승리조건
  const gameConditionData = useRecoilValue(gameCondition);

  // 사용자 정보 셋
  const players = useRecoilValue(playerInfoChangeIcon);
  // 사용자 마크 히스토리 및 무르기 정보
  const [playersHistory, setPlayersHistory] = useState<PlayerHistroyType>({
    0: { rollBack: 3, history: [] },
    1: { rollBack: 3, history: [] },
  });

  // 무르기 있을 시 onClick제어
  const [onClickEnable, setOnClickEnable] = useState<boolean>(true);

  // 플레이어 순서 체크 0부터 시작, 사용자는 인덱스로 찾음
  const [turn, setTurn] = useState<0 | 1 | null>(null);

  // 그라운드 마크 체킹 핸들러
  const boxCheckHandler = useCallback(
    (y: number | null, x: number | null) => {
      if (turn === null) {
        setTurn(0);
      }

      if (y !== null && x !== null && groundData && players) {
        const turnValue = !turn ? 0 : turn;

        setGroundData((cur) => {
          const newArrLine = [...groundData[y]];
          newArrLine[x] = turnValue;
          return { ...cur, [y]: newArrLine };
        });
        setPlayersHistory((cur) => ({
          ...cur,
          [turnValue]: { ...cur[turnValue], history: [...cur[turnValue].history, [x, y]] },
        }));

        // 플레이어 롤백체크 후 롤백진행여부
        if (playersHistory[turnValue].rollBack !== 0) {
          setOnClickEnable(false);
        } else {
          const addDataList = [...playersHistory[turnValue].history, [x, y]];
          // 승리여부체크
          const { win, victoryPosition }: CheckVictoryReturnType =
            addDataList?.length && addDataList?.length >= gameConditionData.victoryCondition
              ? checkVictory(addDataList, gameConditionData.victoryCondition)
              : { win: false, victoryPosition: [] };

          if (!win) return setTurn((cur) => (cur === 0 ? 1 : 0));
          setIsEndGame((cur) => ({
            ...cur,
            win,
            victoryPosition,
          }));
        }
      }
    },
    [turn, playersHistory],
  );

  // 무르기 있을 시 그라운드 마크 여부 핸들러
  const rollbackHandler = useCallback(
    (isRollback: boolean) => {
      const turnValue = !turn ? 0 : turn;
      // 확정시
      if (!isRollback) {
        // 승리여부체크
        const { win, victoryPosition }: CheckVictoryReturnType =
          playersHistory[turnValue].history?.length &&
          playersHistory[turnValue].history?.length >= gameConditionData.victoryCondition
            ? checkVictory(playersHistory[turnValue].history, gameConditionData.victoryCondition)
            : { win: false, victoryPosition: [] };

        if (!win) {
          setTurn((cur) => (cur === 0 ? 1 : 0));
          setOnClickEnable(true);
          return;
        }
        setIsEndGame((cur) => ({ ...cur, win, victoryPosition }));
      }

      // 무르기시
      if (isRollback) {
        setGroundData((cur) => {
          const position =
            playersHistory[turnValue].history[playersHistory[turnValue].history?.length - 1];

          if (groundData) {
            const newArrLine = [...groundData[position[1]]];
            newArrLine[position[0]] = null;
            return { ...cur, [position[1]]: newArrLine };
          }
        });

        setPlayersHistory((cur) => ({
          ...cur,
          [turnValue]: {
            ...cur[turnValue],
            rollBack: cur[turnValue].rollBack - 1,
            history: [...cur[turnValue].history].slice(0, -1),
          },
        }));
        setOnClickEnable(true);
        return;
      }
    },
    [turn, playersHistory],
  );

  // 게임 승자 확정시 컨트롤용
  useEffect(() => {
    if (!isEndGame.win) return;

    setOnClickEnable(false);

    const time = setTimeout(() => {
      const turnValue = !turn ? 0 : turn;
      alert(`${players ? players[turnValue].name : ''} 승리!`);

      // 히스토리 저장
      // 통합한 히스토리라인 생성
      const firstHistory = playersHistory[0].history;
      const twoHistory = playersHistory[1].history;
      const maxLength = Math.max(firstHistory?.length, twoHistory?.length);

      const newHistoryLine = Array(maxLength)
        .fill(null)
        .reduce((acc, _, index) => {
          // 첫번째 들어감
          if (index < firstHistory?.length) {
            acc.push(firstHistory[index]);
          }
          // 두번째 들어감
          if (index < twoHistory?.length) {
            acc.push(twoHistory[index]);
          }
          return acc;
        }, []);

      // 최종 정리되는 자료
      const newHistoryData: LocalStorageHistoryType = {
        players: players
          ? [
              { ...players[0], icon: { ...players[0].icon, label: null } },
              { ...players[1], icon: { ...players[1].icon, label: null } },
            ]
          : [],
        gameCondition: gameConditionData,
        history: newHistoryLine,
        winner: turnValue,
        victoryPosition: isEndGame.victoryPosition,
        time: nowDayAndTimeOnlyNumber({ format: 'YYYY/MM/DD/HH:mm' }),
      };

      // 히스토리 존재여부확인 후 저장
      const preHistoryData = localStorage.getItem('history');
      if (preHistoryData) {
        const newHistoryArr = [...JSON.parse(preHistoryData), newHistoryData];

        localStorage.setItem('history', JSON.stringify(newHistoryArr));
      } else {
        localStorage.setItem('history', JSON.stringify([newHistoryData]));
      }
    }, 500);

    return () => {
      clearTimeout(time);
    };
  }, [isEndGame.win]);

  if (!groundData || !players)
    return (
      <Box
        color="white"
        component="section"
        sx={{ position: 'relative', boxSizing: 'border-box', width: '100%', padding: '30px' }}
      >
        <Typography>세팅값을 입력해주세요.</Typography>
      </Box>
    );

  return (
    <Box
      color="white"
      component="section"
      sx={{ position: 'relative', boxSizing: 'border-box', width: '100%', padding: '30px' }}
    >
      <Typography textAlign="center" marginBottom="50px">
        게임시작
      </Typography>
      {/* 플레이어정보 */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography>{players[0].name}</Typography>{' '}
          <Box color={players[0].color}>{players[0].icon.label}</Box>{' '}
          <Typography>{playersHistory[0].rollBack}</Typography>
          {turn === 0 &&
            playersHistory[0].rollBack !== 0 &&
            playersHistory[0].history.length !== 0 &&
            !isEndGame.win &&
            !onClickEnable && (
              <>
                {' '}
                <button onClick={() => rollbackHandler(false)}>확정</button>
                <button onClick={() => rollbackHandler(true)}>무르기</button>
              </>
            )}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography>{players[1].name}</Typography>{' '}
          <Box color={players[1].color}>{players[1].icon.label}</Box>{' '}
          <Typography>{playersHistory[1].rollBack}</Typography>
          {turn === 1 &&
            playersHistory[1].rollBack !== 0 &&
            playersHistory[1].history.length !== 0 &&
            !isEndGame.win &&
            !onClickEnable && (
              <>
                {' '}
                <button onClick={() => rollbackHandler(false)}>확정</button>
                <button onClick={() => rollbackHandler(true)}>무르기</button>
              </>
            )}
        </Box>
      </Box>
      <CheckBox
        isEndGame={isEndGame}
        onClickEnable={onClickEnable}
        groundData={groundData}
        playerData={players}
        onClickEvent={(y, x) => (onClickEnable ? boxCheckHandler(y, x) : null)}
      />
    </Box>
  );
};

export default Start;
