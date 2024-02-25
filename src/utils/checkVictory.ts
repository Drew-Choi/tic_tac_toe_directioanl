const checkVictory = (playHistory: number[][], victoryValue: number): CheckVictoryReturnType => {
  // 초기 결과값
  let result = { win: false, victoryPosition: [] as number[][] };

  // 중복 여부 판단을 위한 배열 정리
  const axisArrange = playHistory.reduce(
    (acc: { x: { [key: string]: number[] }; y: { [key: string]: number[] } }, [x, y]: number[]) => {
      acc['x'][x] = acc['x'][x] || [];
      acc['y'][y] = acc['y'][y] || [];

      acc['x'][x].push(y);
      acc['y'][y].push(x);

      return acc;
    },
    { x: {}, y: {} },
  );

  // 검사 시작 --------
  // x축 체크(세로빙고)
  if (!result.win) {
    // x와 y축 분리
    const xGroup = Object.entries(axisArrange.x);

    xGroup.some((el) => {
      const yValues = el[1];
      // 겹치는게 3개일 경우만 검사
      if (yValues.length >= victoryValue) {
        const sortYValues = yValues.sort((a, b) => a - b);
        const checkResult = sortYValues.every(
          (value, index, array) => index === 0 || value === array[index - 1] + 1,
        );
        if (!checkResult) return;

        const generateVictoryPosition = sortYValues.map((y) => [Number(el[0]), y]);
        return (result = {
          win: true,
          victoryPosition: generateVictoryPosition,
        });
      }
      return;
    });
  }

  // y축 체크(가로빙고)
  if (!result.win) {
    // x와 y축 분리
    const yGroup = Object.entries(axisArrange.y);

    yGroup.some((el) => {
      const xValues = el[1];
      // 겹치는게 3개일 경우만 검사
      if (xValues.length >= victoryValue) {
        const sortYValues = xValues.sort((a, b) => a - b);
        const checkResult = sortYValues.every(
          (value, index, array) => index === 0 || value === array[index - 1] + 1,
        );
        if (!checkResult) return;

        const generateVictoryPosition = sortYValues.map((x) => [x, Number(el[0])]);
        return (result = { win: true, victoryPosition: generateVictoryPosition });
      }
      return;
    });
  }

  // x와 y로 안되면 가로축검사
  if (!result.win) {
    // 대각선 검사용
    // 우에서 좌로 갈때,
    // const diagonalLeft = playHistory.map(([x, y]) => x + y);
    // // 좌에서 우로 갈때,
    // const diagonalRight = playHistory.map(([x, y]) => x - y);
    // const preLength = diagonalLeft.length;
    // const setLeftLength = new Set(diagonalLeft).size;
    // const setRightLength = new Set(diagonalRight).size;
    // // 겹치는 요소 승리조건과 맞는 지 체크
    // if (preLength - setLeftLength === victoryValue - 1) {
    //   result = { ...result, win: true };
    // }
    // if (preLength - setRightLength === victoryValue - 1) {
    //   result = { ...result, win: true };
    // }

    const diagonalLeft: { [key: number]: number[][] } = {};
    const diagonalRight: { [key: number]: number[][] } = {};

    playHistory.forEach(([x, y]) => {
      const leftValue = x + y;
      const rightValue = x - y;
      // x y를 더하거나 뺀 값으로 키를 생성. 해당 키에 들어가는 좌표의 수 만큼 해당 키의 중복 값이 있다는 걸 의미
      //좌측 데이터 넣기
      diagonalLeft[leftValue] = diagonalLeft[leftValue] || [];
      diagonalLeft[leftValue].push([x, y]);

      // 우측 데이터 넣기
      diagonalRight[rightValue] = diagonalRight[rightValue] || [];
      diagonalRight[rightValue].push([x, y]);

      // 중복 상황 체크(승리조건여부)
      // 좌측
      Object.values(diagonalLeft).forEach((positions) => {
        if (positions.length >= victoryValue) {
          result = { win: true, victoryPosition: positions };
        }
      });

      //우측
      Object.values(diagonalRight).forEach((positions) => {
        if (positions.length >= victoryValue) {
          result = { win: true, victoryPosition: positions };
        }
      });
    });
  }
  // 검사 끝 -----

  return result;
};

export default checkVictory;
