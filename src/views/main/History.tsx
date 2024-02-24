import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import React, { useEffect, useState } from 'react';
import GameBoardPopup from './History_Components/GameBoardPopup';

const History = () => {
  const [historyList, setHistoryList] = useState<LocalStorageHistoryType[] | []>([]);
  // 히스토리 선택 데이터
  const [choiceHistoryData, setChoiceHistoryData] = useState<LocalStorageHistoryType | null>(null);
  console.log(choiceHistoryData);

  useEffect(() => {
    const historyData = localStorage.getItem('history');

    if (!historyData) return;

    const parseHistoryData: LocalStorageHistoryType[] = JSON.parse(historyData);
    setHistoryList(parseHistoryData);
  }, []);

  return (
    <Box
      color="white"
      component="section"
      sx={{ position: 'relative', boxSizing: 'border-box', width: '100%', padding: '30px' }}
    >
      {choiceHistoryData && (
        <GameBoardPopup
          onClickCancel={() => setChoiceHistoryData(null)}
          historyData={choiceHistoryData}
        />
      )}
      {historyList?.length === 0 ? (
        <Typography>게임 히스토리가 없습니다.</Typography>
      ) : (
        historyList?.map((el, index) => (
          <Box key={index} sx={{ cursor: 'pointer' }} onClick={() => setChoiceHistoryData(el)}>
            <Typography>{el?.time}</Typography>
            <Typography>
              {el.players[0]?.name} vs {el.players[1]?.name}
            </Typography>
            <Typography>
              {el?.ground} x {el?.ground}
            </Typography>
          </Box>
        ))
      )}
    </Box>
  );
};

export default History;
