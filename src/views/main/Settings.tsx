import Box from '@mui/material/Box';
import React, { ChangeEvent, FormEvent, useRef, useState } from 'react';

import { useRecoilState, useSetRecoilState } from 'recoil';

import { useNavigate } from 'react-router-dom';
import { playerName } from '../../recoil/playerName';
import { gameCondition } from '../../recoil/gameCondition';
import SVG_LIST from '../../constant/SVG_LIST';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const Settings = () => {
  const playerNameOneRef = useRef<HTMLInputElement>(null);
  const playerNameTwoRef = useRef<HTMLInputElement>(null);
  const [gameSettings, setGameSettings] = useRecoilState(gameCondition);
  const setPlayerName = useSetRecoilState(playerName);
  const [firstPlayPlayer, setFirstPlayPlayer] = useState<number | null>(null);

  const navigate = useNavigate();

  const inputHandler = (e: FormEvent) => {
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
              { idx: 1, name: playerOne, icon: <></>, color: 'red' },
              { idx: 2, name: playerTwo, icon: <></>, color: 'red' },
            ]
          : [
              { idx: 2, name: playerTwo, icon: <></>, color: 'red' },
              { idx: 1, name: playerOne, icon: <></>, color: 'red' },
            ],
      );
    } else {
      setPlayerName(
        firstPlayPlayer === 1
          ? [
              { idx: 1, name: playerOne, icon: <></>, color: 'red' },
              { idx: 2, name: playerTwo, icon: <></>, color: 'red' },
            ]
          : [
              { idx: 2, name: playerTwo, icon: <></>, color: 'red' },
              { idx: 1, name: playerOne, icon: <></>, color: 'red' },
            ],
      );
    }

    navigate('/settings/start');
  };

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
            <Select autoFocus={false} value={SVG_LIST[0].value} label="Age" onChange={() => {}}>
              {SVG_LIST.map((el) => (
                <MenuItem key={el.value} value={el.value}>
                  {el.label}
                </MenuItem>
              ))}
            </Select>
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
