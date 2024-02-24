import React, { useCallback, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useRecoilValue } from 'recoil';
import { groundDataSet } from '../../recoil/gameCondition';
import { playerInfoChangeIcon } from '../../recoil/player';
import CheckBox from './Start_Components/CheckBox';

const Start = () => {
  // 초기 그라운드 데이터 셋
  const groundDataOrigin = useRecoilValue(groundDataSet);
  const [groundData, setGroundData] = useState<GroundDataType | null | undefined>(groundDataOrigin);

  // 사용자 정보 셋
  const players = useRecoilValue(playerInfoChangeIcon);
  // 사용자 마크 히스토리 및 무르기 정보
  const [playersHistory, setPlayersHistory] = useState<PlayerMarkPositionType>({
    0: { rollBack: 3, history: [] },
    1: { rollBack: 3, history: [] },
  });

  // 플레이어 순서 체크 0부터 시작, 사용자는 인덱스로 찾음
  const [turn, setTurn] = useState<0 | 1 | null>(null);

  // 무르기 있을 시 onClick제어
  const [onClickEnable, setOnClickEnable] = useState<boolean>(true);

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
          [turnValue]: { ...cur[turnValue], history: [...cur[turnValue].history, { x, y }] },
        }));

        // 플레이어 롤백체크 후 롤백진행여부
        if (playersHistory[turnValue].rollBack !== 0) {
          return setOnClickEnable(false);
        } else {
          return setTurn((cur) => (cur === 0 ? 1 : 0));
        }
      }
    },
    [turn, playersHistory],
  );

  // 무르기 있을 시 그라운드 마크 여부 핸들러
  const rollbackHandler = useCallback(
    (isRollback: boolean) => {
      // 확정시
      if (!isRollback) {
        setTurn((cur) => (cur === 0 ? 1 : 0));
        setOnClickEnable(true);
        return;
      }

      // 무르기시
      if (isRollback) {
        const turnValue = !turn ? 0 : turn;

        setGroundData((cur) => {
          const position =
            playersHistory[turnValue].history[playersHistory[turnValue].history?.length - 1];

          if (groundData) {
            const newArrLine = [...groundData[position.y]];
            newArrLine[position.x] = null;
            return { ...cur, [position.y]: newArrLine };
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
          <Box color={players[0].color}>{players[0].icon}</Box>{' '}
          <Typography>{playersHistory[0].rollBack}</Typography>
          {turn === 0 &&
            playersHistory[0].rollBack !== 0 &&
            playersHistory[0].history.length !== 0 &&
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
          <Box color={players[1].color}>{players[1].icon}</Box>{' '}
          <Typography>{playersHistory[1].rollBack}</Typography>
          {turn === 1 &&
            playersHistory[1].rollBack !== 0 &&
            playersHistory[1].history.length !== 0 &&
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
        onClickEnable={onClickEnable}
        groundData={groundData}
        playerData={players}
        onClickEvent={(y, x) => (onClickEnable ? boxCheckHandler(y, x) : null)}
      />
    </Box>
  );
};

export default Start;
