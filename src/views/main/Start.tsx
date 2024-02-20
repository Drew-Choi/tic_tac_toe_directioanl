import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import React from 'react';
import COLOR_LIST from '../../style/COLOR_LIST';
import { useRecoilValue } from 'recoil';
import { groundDataSet } from '../../recoil/ground';

const Start = () => {
  const groundData = useRecoilValue(groundDataSet);

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
      <CheckBox data={groundData} />
    </Box>
  );
};

export default Start;

const CheckBox = React.memo(({ data }: { data: GroundDataType }) => {
  return (
    <Grid
      container
      sx={{
        position: 'relative',
        margin: 'auto',
      }}
    >
      <Grid xs={12}>
        {Object.keys(data).map((el: string, index: number) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              alignItems: 'center',
              borderWidth:
                Number(el) !== 0 && Number(el) !== Object.keys(data).length - 1
                  ? '1px 0 1px 0'
                  : '0',
              borderColor: COLOR_LIST.WHITE,
              borderStyle: 'solid',
            }}
          >
            {data[Number(el)].map((mark: null | string, markIndex: number) => (
              <Box
                sx={{
                  flex: '1',
                  width: '200px',
                  height: '200px',
                  borderWidth:
                    data[Number(el)].length === 3 &&
                    markIndex !== 0 &&
                    markIndex !== data[Number(el)].length - 1
                      ? '0 1px 0 1px'
                      : data[Number(el)].length > 3 &&
                          markIndex !== 0 &&
                          markIndex !== data[Number(el)].length - 1
                        ? '0 0 0 1px'
                        : data[Number(el)].length > 3 && markIndex === data[Number(el)].length - 1
                          ? '0 0 0 1px'
                          : '0',
                  borderColor: COLOR_LIST.WHITE,
                  borderStyle: 'solid',
                  cursor: 'pointer',
                  bgcolor: COLOR_LIST.DARK_GRAY,
                }}
                key={`${index}_${markIndex}`}
              >
                {mark === null ? '' : mark}
              </Box>
            ))}
          </Box>
        ))}
      </Grid>
    </Grid>
  );
});

CheckBox.displayName = 'CheckBox';
