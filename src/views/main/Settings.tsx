import Box from '@mui/material/Box';
import React, { ChangeEvent, FormEvent, useCallback, useRef, useState } from 'react';
import { MuiColorInput } from 'mui-color-input';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { gameCondition } from '../../recoil/gameCondition';
import SVG_LIST from '../../constant/SVG_LIST';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { playerInfo } from '../../recoil/player';

const Settings = () => {
  const setPlayerName = useSetRecoilState(playerInfo);
  const [gameSettings, setGameSettings] = useRecoilState(gameCondition);
  const playerNameOneRef = useRef<HTMLInputElement>(null);
  const playerNameTwoRef = useRef<HTMLInputElement>(null);
  const [firstPlayPlayer, setFirstPlayPlayer] = useState<number | null>(null);
  const [selectIcon, setSelectIcon] = useState<{ playerOne: number; playerTwo: number }>({
    playerOne: 1,
    playerTwo: 2,
  });
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
                  idx: 1,
                  name: playerOne,
                  icon: selectIcon.playerOne,
                  color: colorPick.playerOneColor,
                },
                {
                  idx: 2,
                  name: playerTwo,
                  icon: selectIcon.playerTwo,
                  color: colorPick.playerTwoColor,
                },
              ]
            : [
                {
                  idx: 2,
                  name: playerTwo,
                  icon: selectIcon.playerTwo,
                  color: colorPick.playerTwoColor,
                },
                {
                  idx: 1,
                  name: playerOne,
                  icon: selectIcon.playerOne,
                  color: colorPick.playerOneColor,
                },
              ],
        );
      } else {
        setPlayerName(
          firstPlayPlayer === 1
            ? [
                {
                  idx: 1,
                  name: playerOne,
                  icon: selectIcon.playerOne,
                  color: colorPick.playerOneColor,
                },
                {
                  idx: 2,
                  name: playerTwo,
                  icon: selectIcon.playerTwo,
                  color: colorPick.playerTwoColor,
                },
              ]
            : [
                {
                  idx: 2,
                  name: playerTwo,
                  icon: selectIcon.playerTwo,
                  color: colorPick.playerTwoColor,
                },
                {
                  idx: 1,
                  name: playerOne,
                  icon: selectIcon.playerOne,
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
            <Select
              value={selectIcon.playerOne}
              onChange={(e) =>
                setSelectIcon((cur) => ({ ...cur, playerOne: Number(e.target.value) }))
              }
              sx={{
                width: '65px',
                display: 'inline-flex',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                border: 'solid 0.5px #ececec',
                color: colorPick.playerOneColor,
                fontSize: '20px',
              }}
            >
              {SVG_LIST.map((el) =>
                selectIcon.playerTwo !== el.value ? (
                  <MenuItem key={el.value} value={el.value}>
                    {el.label}
                  </MenuItem>
                ) : (
                  <MenuItem disabled key={el.value} value={el.value}>
                    {el.label}
                  </MenuItem>
                ),
              )}
            </Select>
            <MuiColorInput
              sx={{ border: 'solid 0.5px white', borderRadius: '5px', padding: '20px 10px' }}
              value={colorPick.playerOneColor}
              format="hex"
              size="small"
              variant="outlined"
              onChange={(color) => setColorPick((cur) => ({ ...cur, playerOneColor: color }))}
            />
            <input
              type="radio"
              id="playerOne"
              name="choosePlayer"
              value="1"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                e.target.checked ? setFirstPlayPlayer(1) : null;
              }}
            />
          </div>
          <div>
            <label htmlFor="playerTwo">플레이어2</label>
            <input ref={playerNameTwoRef} />
            <Select
              value={selectIcon.playerTwo}
              onChange={(e) =>
                setSelectIcon((cur) => ({ ...cur, playerTwo: Number(e.target.value) }))
              }
              sx={{
                width: '65px',
                display: 'inline-flex',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                border: 'solid 0.5px #ececec',
                color: colorPick.playerTwoColor,
                fontSize: '20px',
              }}
            >
              {SVG_LIST.map((el) =>
                selectIcon.playerOne !== el.value ? (
                  <MenuItem key={el.value} value={el.value}>
                    {el.label}
                  </MenuItem>
                ) : (
                  <MenuItem disabled key={el.value} value={el.value}>
                    {el.label}
                  </MenuItem>
                ),
              )}
            </Select>
            <MuiColorInput
              sx={{ border: 'solid 0.5px white', borderRadius: '5px', padding: '20px 10px' }}
              value={colorPick.playerTwoColor}
              format="hex"
              size="small"
              variant="outlined"
              onChange={(color) => setColorPick((cur) => ({ ...cur, playerTwoColor: color }))}
            />
            <input
              type="radio"
              id="playerTwo"
              name="choosePlayer"
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
