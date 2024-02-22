const checkVictory = (playHistory: number[][], victoryValue: number) => {
  // 초기 결과값
  let result = false;

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

  // x와 y축 분리
  const xGroup = Object.values(axisArrange.x);
  const yGroup = Object.values(axisArrange.y);

  // 대각선 검사용
  // 우에서 좌로 갈때,
  const diagonalLeft = playHistory.map(([x, y]) => x + y);
  // 좌에서 우로 갈때,
  const diagonalRight = playHistory.map(([x, y]) => x - y);

  // 검사 시작 --------
  // x축 체크(세로빙고)
  if (!result) {
    result = xGroup.some((yValues) => {
      // 겹치는게 3개일 경우만 검사
      if (yValues.length >= victoryValue) {
        const sortYValues = yValues.sort((a, b) => a - b);
        return sortYValues.every(
          (value, index, array) => index === 0 || value === array[index - 1] + 1,
        );
      }
      return false;
    });
  }

  // y축 체크(가로빙고)
  if (!result) {
    result = yGroup.some((xValues) => {
      // 겹치는게 3개일 경우만 검사
      if (xValues.length >= victoryValue) {
        const sortYValues = xValues.sort((a, b) => a - b);
        return sortYValues.every(
          (value, index, array) => index === 0 || value === array[index - 1] + 1,
        );
      }
      return false;
    });
  }

  // x와 y로 안되면 가로축검사
  if (!result) {
    const preLength = diagonalLeft.length;
    const setLeftLength = new Set(diagonalLeft).size;
    const setRightLength = new Set(diagonalRight).size;

    // 겹치는 요소 승리조건과 맞는 지 체크
    if (preLength - setLeftLength === victoryValue - 1) {
      result = true;
    }

    if (preLength - setRightLength === victoryValue - 1) {
      result = true;
    }
  }
  // 검사 끝 -----

  return result;
};

export default checkVictory;
