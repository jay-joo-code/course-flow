import { Dropdown, Menu } from 'antd'
import React, { memo, useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import theme from 'src/app/theme'
import { Button } from 'src/components/buttons'
import Icon from 'src/components/icon'
import { FlexRow, Space } from 'src/components/layout'
import Modal from 'src/components/modal'
import Text from 'src/components/text'
import { ISemester } from 'src/types/requirement'
import styled from 'styled-components'
import RequirementListItem from './RequirementListItem'

interface RequirementListProps {
  provided: any
  isDraggingOver: boolean
  semester: ISemester
  semesterNumber: number
  deleteSemester: (semesterNumber: number) => void
}

const Wrapper = styled.div`
  padding: .5rem;
`

const Container = styled.div`
  padding: 1rem;
  min-width: 240px;
  background: ${(props) => props.theme.grey[100]};
  border-radius: 8px;

  // isDraggingOver
  background: ${(props) => props.isDraggingOver && props.theme.brandBg};
`

const menu = (openDeleteModal) => (
  <Menu>
    <Menu.Item
      style={{ color: theme.danger }}
      onClick={openDeleteModal}
    >
      Delete
    </Menu.Item>
  </Menu>
)

const RequirementList = ({ provided, isDraggingOver, semester, semesterNumber, deleteSemester }: RequirementListProps) => {
  const heading = semesterNumber === 0
    ? 'Transfer Credits'
    : `Semester ${semesterNumber}`

  console.log('semesterNumber :>> ', semesterNumber)

  // compute credits
  const totalCredits = 0
  semester
    .forEach((requirementId: string) => {
      // totalCredits += requirementCredits(idToRequirement[requirementId])
    })

  // delete semester handling
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openDeleteModal = () => {
    setIsModalOpen(true)
  }

  const handleClickDelete = () => {
    deleteSemester(semesterNumber)
    setIsModalOpen(false)
  }

  return (
    <Wrapper>
      <Container
        ref={provided.innerRef}
        {...provided.droppableProps}
        isDraggingOver={isDraggingOver}
      >
        <FlexRow
          jsb
          alignStart
        >
          <div>
            <Space margin='.2rem 0' />
            <Text
              variant='h5'
              fontWeight={500}
              color={theme.textLight}
            >{heading}</Text>
            {/* <Text
              variant='h6'
              color={theme.textMuted}
              fontWeight={400}
            >{totalCredits} credits</Text> */}
          </div>
          <Dropdown
            overlay={menu(openDeleteModal)}
            trigger={['click']}
            placement='bottomRight'
          >
            <Icon
              variant='more-hori'
              size='1.75rem'
              fill={theme.textMuted}
              interactiveHover
              pointer
            />
          </Dropdown>
        </FlexRow>
        <Space margin='1rem 0' />
        {semester.map((requirementId, row) => (
          <Draggable
            key={requirementId}
            draggableId={requirementId}
            index={row}
          >
            {(provided, snapshot) => (
              <RequirementListItem
                provided={provided}
                draggableStyle={provided.draggableProps.style}
                isDragging={snapshot.isDragging}
                requirementId={requirementId}
                row={row}
                semesterNumber={semesterNumber}
              />
            )}
          </Draggable>
        ))}
        {provided.placeholder}
      </Container>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        isHideHeader
      >
        <Text
          variant='p'
          fontWeight={500}
        >Delete semester</Text>
        <Space margin='.5rem 0' />
        <Text
          maxWidth={280}
          variant='h6'
        >All requirements within this semester will be permanently deleted</Text>
        <Space margin='1rem 0' />
        <FlexRow
          ac
          je
        >
          <Button
            text
            label='Cancel'
            onClick={() => setIsModalOpen(false)}
          />
          <Space margin='0 .5rem' />
          <Button
            label='Delete'
            onClick={handleClickDelete}
          />
        </FlexRow>
      </Modal>
    </Wrapper>
  )
}

export default memo(RequirementList)
