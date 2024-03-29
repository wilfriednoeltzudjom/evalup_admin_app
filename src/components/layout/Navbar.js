import React from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Flex, Menu, MenuButton, MenuGroup, MenuList, Button, Stack, Avatar, Text } from '@chakra-ui/core';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { BiLogOut } from 'react-icons/bi';
import { useDispatch } from 'react-redux';

import dimens from '../../config/dimens';
import dialogsActions from '../../store/actions/ui/dialogs';
import authActions from '../../store/actions/auth';

import Logo from '../helpers/Logo';
import NavbarAction from './navbar_actions/NavbarAction';

function Navbar() {
  const dispatch = useDispatch();
  const history = useHistory();

  function handleLogout() {
    dispatch(
      dialogsActions.showConfirmationDialog({
        title: 'Déconnexion ?',
        message:
          'En vous déconnectant, toutes vos actions en cours seront annulées et aucune sauvegarde ne sera effectuée.',
        onConfirm: function () {
          dispatch(authActions.logout({ history }));
        }
      })
    );
  }

  return (
    <Box
      position='sticky'
      backgroundColor='white'
      top='0'
      zIndex={2}
      height={dimens.navbarHeight}
      boxShadow='0 1px 5px 0 rgba(0, 0, 0, 0.1)'
    >
      <Flex height='100%' padding='0 2rem' justifyContent='space-between' alignItems='center'>
        <Logo />

        <Menu placement='bottom-end'>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            <Stack direction='row' spacing={2} alignItems='center'>
              <Avatar size='sm' rounded='full' src='https://bit.ly/broken-link' alt='Fluffybuns the destroyer' />
              <Text>Admin</Text>
            </Stack>
          </MenuButton>
          <MenuList>
            <MenuGroup title='Profil'>
              <NavbarAction icon={BiLogOut} title='Déconnexion' onClick={handleLogout} />
            </MenuGroup>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
}

export default Navbar;
