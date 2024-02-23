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
  { value: 1, label: <FaRegCircle color="inherit" style={{ transform: 'translateY(10%)' }} /> },
  { value: 2, label: <RxCross2 color="inherit" style={{ transform: 'translateY(10%)' }} /> },
  {
    value: 3,
    label: <IoTriangleOutline color="inherit" style={{ transform: 'translateY(10%)' }} />,
  },
  {
    value: 4,
    label: <MdOutlineRectangle color="inherit" style={{ transform: 'translateY(10%)' }} />,
  },
  { value: 5, label: <FaRegStar color="inherit" style={{ transform: 'translateY(10%)' }} /> },
  { value: 6, label: <FiHexagon color="inherit" style={{ transform: 'translateY(10%)' }} /> },
  {
    value: 7,
    label: <IoAccessibilityOutline color="inherit" style={{ transform: 'translateY(10%)' }} />,
  },
  {
    value: 8,
    label: <IoAmericanFootballOutline color="inherit" style={{ transform: 'translateY(10%)' }} />,
  },
  {
    value: 9,
    label: <IoGameControllerOutline color="inherit" style={{ transform: 'translateY(10%)' }} />,
  },
  { value: 10, label: <IoHeartOutline color="inherit" style={{ transform: 'translateY(10%)' }} /> },
];

export default SVG_LIST;
