import React from 'react';
import styled from 'styled-components';
import sortIconDefault from './icons/sort_icon.svg';
import sortAscIcon from './icons/sort_asc_icon.svg';
import sortDescIcon from './icons/sort_desc_icon.svg';

const Icon = styled.img`
  width: 10px;
  margin-right: 5px;
`;

export default function ({ sorting }) {
  let sortIcon = sortIconDefault;
  switch (sorting) {
    case 'ASC': sortIcon = sortAscIcon; break;
    case 'DESC': sortIcon = sortDescIcon; break;
  }
  return <Icon src={sortIcon} />
}
