import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import React from 'react';
import COLOR_LIST from '../../style/COLOR_LIST';
import { useRecoilValue } from 'recoil';
import { groundDataSet } from '../../recoil/gameCondition';
import { useIsMobile } from '../../hooks/useIsMobile';
import { playerName } from '../../recoil/playerName';

const Start = () => {
  const groundData = useRecoilValue(groundDataSet);
  const players = useRecoilValue(playerName);

  console.log(players);

  console.log(groundData);

  const boxCheckHandler = (y: number, x: number) => {
    console.log('x: ', x);
    console.log('y: ', y);
  };

  if (!groundData)
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
      <CheckBox data={groundData} onClickEvent={(y, x) => boxCheckHandler(y, x)} />
    </Box>
  );
};

export default Start;

const CheckBox = React.memo(
  ({
    data,
    onClickEvent,
  }: {
    data: GroundDataType;
    onClickEvent?: (y: number, x: number) => void;
  }) => {
    // 모바일 체크
    const isMobile = useIsMobile();

    return (
      <Grid
        container
        sx={{
          position: 'relative',
          margin: 'auto',
        }}
      >
        <Grid xs={12}>
          {Object.keys(data).map((el: string, index: number) => {
            // 세로 끝 인덱스
            const lastIndex = Object.keys(data).length - 1;

            return (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  borderWidth: Number(el) !== 0 && Number(el) !== lastIndex ? '1px 0 1px 0' : '0',
                  borderColor: COLOR_LIST.WHITE,
                  borderStyle: 'solid',
                }}
              >
                {data[Number(el)].map((mark: null | string, markIndex: number) => {
                  // 가로 끝 인덱스
                  const lastMarkIndex = data[Number(el)].length - 1;
                  // 공통 값
                  const commonBorderWidth = '1px';
                  const commonBorderRadius = '50px';

                  return (
                    <Box
                      onClick={() => onClickEvent && onClickEvent(index, markIndex)}
                      sx={{
                        '&:hover': !isMobile
                          ? {
                              opacity: '0.5',
                            }
                          : null,
                        flex: '1',
                        aspectRatio: '1/1',
                        width: '100%',
                        borderWidth:
                          data[Number(el)].length === 3 &&
                          markIndex !== 0 &&
                          markIndex !== lastMarkIndex
                            ? `0 ${commonBorderWidth} 0 ${commonBorderWidth}`
                            : data[Number(el)].length > 3 &&
                                markIndex !== 0 &&
                                markIndex !== lastMarkIndex
                              ? `0 0 0 ${commonBorderWidth}`
                              : data[Number(el)].length > 3 && markIndex === lastMarkIndex
                                ? `0 0 0 ${commonBorderWidth}`
                                : '0',
                        borderColor: COLOR_LIST.WHITE,
                        borderStyle: 'solid',
                        cursor: 'pointer',
                        bgcolor: COLOR_LIST.DARK_GRAY,
                        borderRadius:
                          index === 0 && markIndex === 0
                            ? `${commonBorderRadius} 0 0 0`
                            : index === 0 && markIndex === lastMarkIndex
                              ? `0 ${commonBorderRadius} 0 0`
                              : index === lastIndex && markIndex === 0
                                ? `0 0 0 ${commonBorderRadius}`
                                : index === lastIndex && markIndex === lastMarkIndex
                                  ? `0 0 ${commonBorderRadius}`
                                  : '',
                      }}
                      key={`${index}_${markIndex}`}
                    >
                      {mark === null ? '' : mark}
                    </Box>
                  );
                })}
              </Box>
            );
          })}
        </Grid>
      </Grid>
    );
  },
);

CheckBox.displayName = 'CheckBox';
