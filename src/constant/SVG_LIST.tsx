import React from 'react';
import { ReactNode } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { FaRegCircle } from 'react-icons/fa';
import { IoTriangleOutline } from 'react-icons/io5';
import { MdOutlineRectangle } from 'react-icons/md';
import { FaRegStar } from 'react-icons/fa';
import { FiHexagon } from 'react-icons/fi';
import { IoAccessibilityOutline } from 'react-icons/io5';
import { IoAmericanFootballOutline } from 'react-icons/io5';
import { IoGameControllerOutline } from 'react-icons/io5';
import { IoHeartOutline } from 'react-icons/io5';

const SVG_LIST: { value: number; label: ReactNode }[] = [
  {
    value: 1,
    label: <RxCross2 color="inherit" />,
  },
  { value: 2, label: <FaRegCircle color="inherit" /> },
  {
    value: 3,
    label: <IoTriangleOutline color="inherit" />,
  },
  {
    value: 4,
    label: <MdOutlineRectangle color="inherit" />,
  },
  { value: 5, label: <FaRegStar color="inherit" /> },
  { value: 6, label: <FiHexagon color="inherit" /> },
  {
    value: 7,
    label: <IoAccessibilityOutline color="inherit" />,
  },
  {
    value: 8,
    label: <IoAmericanFootballOutline color="inherit" />,
  },
  {
    value: 9,
    label: <IoGameControllerOutline color="inherit" />,
  },
  { value: 10, label: <IoHeartOutline color="inherit" /> },
];

export default SVG_LIST;
