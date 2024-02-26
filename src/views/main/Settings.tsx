import Box from '@mui/material/Box';
import React, { ChangeEvent, FormEvent, useCallback, useRef, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { gameCondition } from '../../recoil/gameCondition';
import SVG_LIST from '../../constant/SVG_LIST';
import { playerInfo } from '../../recoil/player';
import Typography from '@mui/material/Typography';
import SliderCustom from '../../components/SliderCustom';
import { GROUND_SETTING_VALUE } from '../../constant/COUNT_NUMBER';
import PlayersSettingBox from './Settings_Components/PlayersSettingBox';
import ButtonNormal from '../../components/ButtonNormal';
import { usePopup } from '../../hooks/usePopup';

const Settings = () => {
  const { openPopup } = usePopup();

  const setPlayerName = useSetRecoilState(playerInfo);
  const [gameSettings, setGameSettings] = useRecoilState(gameCondition);
  const playerNameOneRef = useRef<HTMLInputElement>(null);
  const playerNameTwoRef = useRef<HTMLInputElement>(null);
  const [firstPlayPlayer, setFirstPlayPlayer] = useState<number | null>(null);

  // 마크 선택 기본
  const [selectIcon, setSelectIcon] = useState<{ playerOne: number; playerTwo: number }>({
    playerOne: 1,
    playerTwo: 2,
  });
  // 컬러피커 기본
  const [colorPick, setColorPick] = useState<{
    playerOneColor: string;
    playerTwoColor: string;
  }>({ playerOneColor: '#3961ff', playerTwoColor: '#ff0000' });

  const navigate = useNavigate();

  // 최종등록
  const inputHandler = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      if (!gameSettings.ground) {
        setGameSettings((cur) => ({ ...cur, ground: 3 }));
      }

      // 플레이어 이름 // 디폴트 설정도 같이
      const playerOne = playerNameOneRef.current?.value
        ? playerNameOneRef.current?.value
        : '플레이어1';

      const playerTwo = playerNameTwoRef.current?.value
        ? playerNameTwoRef.current?.value
        : '플레이어2';

      if (playerOne?.length > 6)
        return openPopup({ title: '안내', content: '플레이어1 이름을 6자 이내로 해주세요.' });

      if (playerTwo?.length > 6)
        return openPopup({ title: '안내', content: '플레이어2 이름을 6자 이내로 해주세요.' });

      if (!firstPlayPlayer) {
        const random = Math.floor(Math.random() * 2) + 1;

        setPlayerName(
          random === 1
            ? [
                {
                  name: playerOne,
                  icon: { value: selectIcon.playerOne },
                  color: colorPick.playerOneColor,
                },
                {
                  name: playerTwo,
                  icon: { value: selectIcon.playerTwo },
                  color: colorPick.playerTwoColor,
                },
              ]
            : [
                {
                  name: playerTwo,
                  icon: { value: selectIcon.playerTwo },
                  color: colorPick.playerTwoColor,
                },
                {
                  name: playerOne,
                  icon: { value: selectIcon.playerOne },
                  color: colorPick.playerOneColor,
                },
              ],
        );
      } else {
        setPlayerName(
          firstPlayPlayer === 1
            ? [
                {
                  name: playerOne,
                  icon: { value: selectIcon.playerOne },
                  color: colorPick.playerOneColor,
                },
                {
                  name: playerTwo,
                  icon: { value: selectIcon.playerTwo },
                  color: colorPick.playerTwoColor,
                },
              ]
            : [
                {
                  name: playerTwo,
                  icon: { value: selectIcon.playerTwo },
                  color: colorPick.playerTwoColor,
                },
                {
                  name: playerOne,
                  icon: { value: selectIcon.playerOne },
                  color: colorPick.playerOneColor,
                },
              ],
        );
      }

      navigate('/settings/start');
    },
    [
      gameSettings,
      firstPlayPlayer,
      playerNameOneRef.current?.value,
      playerNameTwoRef.current?.value,
      selectIcon,
      colorPick,
    ],
  );

  return (
    <Box
      color="white"
      component="section"
      sx={{
        position: 'relative',
        boxSizing: 'border-box',
        width: '100%',
        padding: { xs: '30px 10px', sm: '30px 50px', md: '30px 100px' },
      }}
    >
      <Box
        component="form"
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '50px' }}
        onSubmit={inputHandler}
      >
        <Box sx={{ width: '100%' }}>
          <Typography>게임판 설정 -</Typography>
          <SliderCustom
            marks={GROUND_SETTING_VALUE}
            sx={{ width: '98%', left: '50%', transform: 'translateX(-50%)' }}
            onChangeEvent={(_, value) =>
              setGameSettings((cur) => ({ ...cur, ground: Number(value) }))
            }
          />
        </Box>
        <Box sx={{ width: '100%' }}>
          <Typography sx={{ marginBottom: '30px' }}>승리조건 설정 -</Typography>
          <SliderCustom
            valueLabelDisplay="on"
            marks={true}
            min={3}
            max={!gameSettings.ground ? 3 : gameSettings.ground}
            sx={{ width: '98%', left: '50%', transform: 'translateX(-50%)' }}
            onChangeEvent={(_, value) =>
              setGameSettings((cur) => ({ ...cur, victoryCondition: Number(value) }))
            }
          />
        </Box>

        <PlayersSettingBox
          inputPlaceholder="6자 이내"
          playerNameRef={playerNameOneRef}
          inputLabel="PLAYER 1"
          selectData={SVG_LIST}
          selectValue={String(selectIcon.playerOne)}
          onChangeSelector={(e) =>
            setSelectIcon((cur) => ({ ...cur, playerOne: Number(e.target.value) }))
          }
          selectDisableValue={selectIcon.playerTwo}
          selectActiveColor={colorPick.playerOneColor}
          colorPickerValue={colorPick.playerOneColor}
          onChangeColorPicker={(color) =>
            setColorPick((cur) => ({ ...cur, playerOneColor: color }))
          }
          radioChecked={String(firstPlayPlayer) === '1'}
          radioId="playerOne"
          radioName="choicePlayer"
          radioValue="1"
          onChangeRadio={(e: ChangeEvent<HTMLInputElement>) => {
            e.target.checked ? setFirstPlayPlayer(1) : null;
          }}
        />

        <PlayersSettingBox
          inputPlaceholder="6자 이내"
          containerSx={{ marginBottom: '50px' }}
          playerNameRef={playerNameTwoRef}
          inputLabel="PLAYER 2"
          selectData={SVG_LIST}
          selectValue={String(selectIcon.playerTwo)}
          onChangeSelector={(e) =>
            setSelectIcon((cur) => ({ ...cur, playerTwo: Number(e.target.value) }))
          }
          selectDisableValue={selectIcon.playerOne}
          selectActiveColor={colorPick.playerTwoColor}
          colorPickerValue={colorPick.playerTwoColor}
          onChangeColorPicker={(color) =>
            setColorPick((cur) => ({ ...cur, playerTwoColor: color }))
          }
          radioChecked={String(firstPlayPlayer) === '2'}
          radioId="playerTwo"
          radioName="choicePlayer"
          radioValue="2"
          onChangeRadio={(e: ChangeEvent<HTMLInputElement>) => {
            e.target.checked ? setFirstPlayPlayer(2) : null;
          }}
        />
        <ButtonNormal size="large" type="submit" sx={{ fontSize: '20px' }}>
          게임시작
        </ButtonNormal>
      </Box>
    </Box>
  );
};

export default Settings;
