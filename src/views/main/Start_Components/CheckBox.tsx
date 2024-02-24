import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import React from 'react';
import COLOR_LIST from '../../../style/COLOR_LIST';
import { useIsMobile } from '../../../hooks/useIsMobile';

const CheckBox = ({
  groundData,
  playerData,
  onClickEnable,
  onClickEvent,
}: {
  groundData: GroundDataType;
  playerData: PlayerInfoType[];
  onClickEnable: boolean;
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
        {Object.keys(groundData).map((el: string, index: number) => {
          // 세로 끝 인덱스
          const lastIndex = Object.keys(groundData).length - 1;

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
              {groundData[Number(el)].map((playerMark: null | (0 | 1), playerMarkIndex: number) => {
                // 가로 끝 인덱스
                const lastMarkIndex = groundData[Number(el)].length - 1;
                // 공통 값
                const commonBorderWidth = '1px';
                const commonBorderRadius = '50px';

                return (
                  <Box
                    onClick={() =>
                      onClickEvent && playerMark === null && onClickEvent(index, playerMarkIndex)
                    }
                    sx={{
                      '&:hover':
                        onClickEnable && playerMark === null && !isMobile
                          ? {
                              opacity: '0.5',
                            }
                          : null,
                      flex: '1',
                      aspectRatio: '1/1',
                      width: '100%',
                      borderWidth:
                        groundData[Number(el)].length === 3 &&
                        playerMarkIndex !== 0 &&
                        playerMarkIndex !== lastMarkIndex
                          ? `0 ${commonBorderWidth} 0 ${commonBorderWidth}`
                          : groundData[Number(el)].length > 3 &&
                              playerMarkIndex !== 0 &&
                              playerMarkIndex !== lastMarkIndex
                            ? `0 0 0 ${commonBorderWidth}`
                            : groundData[Number(el)].length > 3 && playerMarkIndex === lastMarkIndex
                              ? `0 0 0 ${commonBorderWidth}`
                              : '0',
                      borderColor: COLOR_LIST.WHITE,
                      borderStyle: 'solid',
                      cursor: 'pointer',
                      bgcolor: COLOR_LIST.DARK_GRAY,
                      borderRadius:
                        index === 0 && playerMarkIndex === 0
                          ? `${commonBorderRadius} 0 0 0`
                          : index === 0 && playerMarkIndex === lastMarkIndex
                            ? `0 ${commonBorderRadius} 0 0`
                            : index === lastIndex && playerMarkIndex === 0
                              ? `0 0 0 ${commonBorderRadius}`
                              : index === lastIndex && playerMarkIndex === lastMarkIndex
                                ? `0 0 ${commonBorderRadius}`
                                : '',
                    }}
                    key={`${index}_${playerMarkIndex}`}
                  >
                    {playerMark === null ? (
                      ''
                    ) : (
                      <Box color={playerData[playerMark].color}>
                        {playerData[playerMark].icon.label}
                      </Box>
                    )}
                  </Box>
                );
              })}
            </Box>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default React.memo(CheckBox);
