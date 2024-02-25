import Box from '@mui/material/Box';
import React, { ChangeEvent, FormEvent, useCallback, useRef, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { gameCondition } from '../../recoil/gameCondition';
import SVG_LIST from '../../constant/SVG_LIST';
import { playerInfo } from '../../recoil/player';
import Selector from '../../components/Selector';
import ColorPicker from '../../components/ColorPicker';

const Settings = () => {
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
      sx={{ position: 'relative', boxSizing: 'border-box', width: '100%', padding: '30px' }}
    >
      <Box>
        <form
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          onSubmit={inputHandler}
        >
          <div>
            칸수
            <input
              type="number"
              min="3"
              max="10"
              value={!gameSettings.ground ? 3 : gameSettings.ground}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setGameSettings((cur) => ({ ...cur, ground: Number(e.target.value) }))
              }
            />
          </div>
          <div>
            <label htmlFor="playerOne">플레이어1</label>
            <input ref={playerNameOneRef} />
            <Selector
              selectData={SVG_LIST}
              value={String(selectIcon.playerOne)}
              onChangeEvent={(e) =>
                setSelectIcon((cur) => ({ ...cur, playerOne: Number(e.target.value) }))
              }
              disableValue={selectIcon.playerTwo}
              activeColor={colorPick.playerOneColor}
            />
            <ColorPicker
              value={colorPick.playerOneColor}
              onChangeEvent={(color) => setColorPick((cur) => ({ ...cur, playerOneColor: color }))}
            />
            <input
              type="radio"
              id="playerOne"
              name="choicePlayer"
              value="1"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                e.target.checked ? setFirstPlayPlayer(1) : null;
              }}
            />
          </div>
          <div>
            <label htmlFor="playerTwo">플레이어2</label>
            <input ref={playerNameTwoRef} />
            <Selector
              selectData={SVG_LIST}
              value={String(selectIcon.playerTwo)}
              onChangeEvent={(e) =>
                setSelectIcon((cur) => ({ ...cur, playerTwo: Number(e.target.value) }))
              }
              disableValue={selectIcon.playerOne}
              activeColor={colorPick.playerTwoColor}
            />
            <ColorPicker
              value={colorPick.playerTwoColor}
              onChangeEvent={(color) => setColorPick((cur) => ({ ...cur, playerTwoColor: color }))}
            />
            <input
              type="radio"
              id="playerTwo"
              name="choicePlayer"
              value="2"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                e.target.checked ? setFirstPlayPlayer(2) : null;
              }}
            />
          </div>
          <div>
            승리조건
            <input
              type="number"
              min="3"
              max={!gameSettings.ground ? '3' : gameSettings.ground}
              value={gameSettings.victoryCondition}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setGameSettings((cur) => ({ ...cur, victoryCondition: Number(e.target.value) }))
              }
            />
          </div>
          <button type="submit">등록</button>
        </form>

        <br />
      </Box>
    </Box>
  );
};

export default Settings;
