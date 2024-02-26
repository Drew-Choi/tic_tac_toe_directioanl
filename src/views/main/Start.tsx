import React, { useCallback, useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useRecoilValue } from 'recoil';
import { gameCondition, groundDataSet } from '../../recoil/gameCondition';
import { playerInfoChangeIcon } from '../../recoil/player';
import CheckBox from './Start_Components/CheckBox';
import checkVictory from '../../utils/checkVictory';
import { nowDayAndTimeOnlyNumber } from '../../utils/generateDate';
import { ROLLBACK_COUNT } from '../../constant/COUNT_NUMBER';
import ButtonNormal from '../../components/ButtonNormal';
import COLOR_LIST from '../../style/COLOR_LIST';
import { usePopup } from '../../hooks/usePopup';
import { useNavigate } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';

const Start = () => {
  const { openPopup } = usePopup();
  const navigate = useNavigate();
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
    0: { rollBack: ROLLBACK_COUNT, history: [] },
    1: { rollBack: ROLLBACK_COUNT, history: [] },
  });

  // 무르기 있을 시 onClick제어
  const [onClickEnable, setOnClickEnable] = useState<boolean>(true);

  // 플레이어 순서 체크 0부터 시작, 사용자는 인덱스로 찾음
  const [turn, setTurn] = useState<0 | 1 | null>(null);
  // 전체 카운트, 무승부 체크용 (0이 되어도 승부가 안나면 무승부)
  const [totalTurn, setTotalTurn] = useState<number | null>(
    gameConditionData?.ground ? gameConditionData?.ground * gameConditionData?.ground : null,
  );

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

          // 승리조건 아니면 턴이동 진행
          if (!win) {
            setTurn((cur) => (cur === 0 ? 1 : 0));
            setTotalTurn((cur) => (cur !== null ? cur - 1 : null));
            return;
          }

          // 승리조건이면 해당 사항 저장(승리 마크 포지션 등)
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

      // 확정시(무르기x) ------
      if (!isRollback) {
        // 승리여부체크
        const { win, victoryPosition }: CheckVictoryReturnType =
          playersHistory[turnValue].history?.length &&
          playersHistory[turnValue].history?.length >= gameConditionData.victoryCondition
            ? checkVictory(playersHistory[turnValue].history, gameConditionData.victoryCondition)
            : { win: false, victoryPosition: [] };

        // 승리조건이 아닐 때
        if (!win) {
          setTurn((cur) => (cur === 0 ? 1 : 0));
          setTotalTurn((cur) => (cur !== null ? cur - 1 : null));
          setOnClickEnable(true);
          return;
        }

        // 승리조건일 경우
        setIsEndGame((cur) => ({ ...cur, win, victoryPosition }));
      }

      // 무르기시 ---------
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

  // 게임 종료시 사용  -----
  // 승자 데이터 저장 함수 // winnerValue 2는 무승부
  const saveVictoryInfo = useCallback(
    ({
      winnerValue,
      victoryPosition,
    }: {
      winnerValue: 0 | 1 | 2;
      victoryPosition: number[][] | [];
    }) => {
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
        winner: winnerValue,
        victoryPosition,
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
    },
    [totalTurn, isEndGame.win],
  );

  // 게임 승자 확정시 컨트롤용
  useEffect(() => {
    if (!isEndGame.win) return;

    setOnClickEnable(false);

    const time = setTimeout(() => {
      const turnValue = !turn ? 0 : turn;
      openPopup({
        title: '게임 종료',
        content: `${players ? players[turnValue].name : ''} 승리!`,
        onStart: () => navigate('/'),
        onHistory: () => navigate('/history'),
      });
      saveVictoryInfo({ winnerValue: turnValue, victoryPosition: isEndGame.victoryPosition });
    }, 500);

    return () => {
      clearTimeout(time);
    };
  }, [isEndGame.win]);

  // 게임 무승부시 작동
  useEffect(() => {
    if (totalTurn !== 0) return;

    if (!isEndGame.win && totalTurn === 0) {
      setOnClickEnable(false);
      openPopup({
        title: '게임 종료',
        content: `무승부`,
        onStart: () => navigate('/'),
        onHistory: () => navigate('/history'),
      });
      saveVictoryInfo({ winnerValue: 2, victoryPosition: [] });
    }
  }, [totalTurn]);

  if (!groundData || !players)
    return (
      <Box
        color="white"
        component="section"
        sx={{
          position: 'relative',
          boxSizing: 'border-box',
          width: '100%',
          padding: '30px',
        }}
      >
        <Typography>뒤로 돌아가 게임 세팅값을 입력해주세요.</Typography>
      </Box>
    );

  return (
    <Box
      color="white"
      component="section"
      sx={{
        position: 'relative',
        boxSizing: 'border-box',
        width: '100%',
        padding: { xs: '30px 10px', md: '30px' },
      }}
    >
      <Typography textAlign="center" marginBottom="50px" fontSize="25px">
        {isEndGame.win || totalTurn === 0 ? 'END' : 'START'}
      </Typography>
      {/* 플레이어정보 */}
      <Box
        sx={{
          display: 'flex',
          position: 'relative',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          height: { xs: '120px', sm: '70px' },
        }}
      >
        <Box sx={{ position: 'relative', opacity: turn === 0 || turn === null ? '1' : '0.3' }}>
          <FaCheck
            style={{
              display: turn !== null && turn === 0 ? 'block' : 'none',
              position: 'absolute',
              color: COLOR_LIST.STRONG_PINK,
              top: '-35px',
              left: '20px',
            }}
            size={35}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Typography gutterBottom>{players[0]?.name}</Typography>
            <Box color={players[0]?.color}>{players[0]?.icon.label}</Box>
            <Typography sx={{ display: { xs: 'none', sm: 'block' } }}>
              <span style={{ fontSize: '12px' }}>무르기 남은 횟수: </span>
              {playersHistory[0]?.rollBack}
            </Typography>
          </Box>
          {/* 반응형 위치 변경 */}
          <Typography sx={{ display: { xs: 'block', sm: 'none' } }}>
            <span style={{ fontSize: '12px' }}>무르기 남은 횟수: </span>
            {playersHistory[0].rollBack}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {turn === 0 &&
              playersHistory[0].rollBack !== 0 &&
              playersHistory[0].history.length !== 0 &&
              !isEndGame.win &&
              !onClickEnable && (
                <Box sx={{ display: 'flex', gap: '10px' }}>
                  <ButtonNormal onClickEvent={() => rollbackHandler(false)}>확정</ButtonNormal>
                  <ButtonNormal
                    onClickEvent={() => rollbackHandler(true)}
                    sx={{ borderColor: COLOR_LIST.PINK }}
                  >
                    무르기
                  </ButtonNormal>
                </Box>
              )}
          </Box>
        </Box>

        <Box sx={{ position: 'relative', opacity: turn === 1 || turn === null ? '1' : '0.3' }}>
          <FaCheck
            style={{
              display: turn !== null && turn === 1 ? 'block' : 'none',
              position: 'absolute',
              color: COLOR_LIST.STRONG_PINK,
              top: '-35px',
              right: '20px',
            }}
            size={35}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'right' }}>
            <Typography sx={{ display: { xs: 'none', sm: 'block' } }}>
              <span style={{ fontSize: '12px' }}>무르기 남은 횟수: </span>
              {playersHistory[1].rollBack}
            </Typography>
            <Box color={players[1]?.color}>{players[1]?.icon.label}</Box>
            <Typography gutterBottom>{players[1]?.name}</Typography>
          </Box>
          {/* 반응형 위치 변경 */}
          <Typography sx={{ display: { xs: 'block', sm: 'none' } }}>
            <span style={{ fontSize: '12px' }}>무르기 남은 횟수: </span>
            {playersHistory[1].rollBack}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'right' }}>
            {turn === 1 &&
              playersHistory[1].rollBack !== 0 &&
              playersHistory[1].history.length !== 0 &&
              !isEndGame.win &&
              !onClickEnable && (
                <Box sx={{ display: 'flex', gap: '10px' }}>
                  <ButtonNormal
                    onClickEvent={() => rollbackHandler(true)}
                    sx={{ borderColor: COLOR_LIST.PINK }}
                  >
                    무르기
                  </ButtonNormal>
                  <ButtonNormal onClickEvent={() => rollbackHandler(false)}>확정</ButtonNormal>
                </Box>
              )}
          </Box>
        </Box>
      </Box>

      {/* 게임 본문 */}
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
