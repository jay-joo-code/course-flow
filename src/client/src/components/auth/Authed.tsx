import React from 'react'
import styled from 'styled-components'
import Avatar from '../avatar'
import Icon from '../icon'
import { FlexRow, Space } from '../layout'
import { Menu, Dropdown } from 'antd'
import { Link } from 'react-router-dom'
import theme from 'src/app/theme'
import { useCurrentUserPlans } from 'src/api/user'
import { IPlanDoc } from 'src/types/plan'
import moment from 'moment'
import Text from '../text'

interface AuthedProps {
  userPhotoSrc: string
}

const Container = styled(FlexRow)`
  align-items: center;
  cursor: pointer;
`

const StyledSubMenu = styled(Menu.SubMenu)`
  & svg {
    display: none !important;
  }
`

const menu = (plans: (IPlanDoc[] | null | undefined)) => (
  <Menu>
    <StyledSubMenu title='My plans'>
      {plans?.map((plan) => (
        <Menu.Item key={plan._id}>
          <Link to={`/plan/${plan.shortId}`}>
            <Text
              variant='h5'
              fontWeight={500}
            >{plan.major.name}</Text>
            <Text
              variant='h6'
              color={theme.textMuted}
            >Updated {moment(plan.updatedAt).fromNow()}</Text>
          </Link>
        </Menu.Item>
      ))}
      <Menu.Item>
        <Link to='/new'>+ Add new plan</Link>
      </Menu.Item>
    </StyledSubMenu>
    <Menu.Item>
      <Link
        to='/new'
      >New plan</Link>
    </Menu.Item>
    <Menu.Item>
      <Link
        to='/logout'
        style={{ color: theme.danger }}
      >Logout</Link>
    </Menu.Item>
  </Menu>
)

const Authed = ({ userPhotoSrc }: AuthedProps) => {
  const { plans } = useCurrentUserPlans()

  return (
    <Dropdown
      overlay={menu(plans)}
      trigger={['click']}
      arrow
    >
      <Container>
        <Avatar src={userPhotoSrc} />
        <Space margin='0 .1rem' />
        <Icon
          variant='down'
          size='1.5rem'
        />
      </Container>
    </Dropdown>
  )
}

export default Authed
