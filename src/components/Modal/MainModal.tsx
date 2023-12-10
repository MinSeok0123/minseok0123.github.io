import React, { FC, useEffect, useState } from 'react'
import styled from 'styled-components'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
}

const ModalOverlay = styled.div<{ isOpen: boolean }>`
  display: ${props => (props.isOpen ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`

const ModalContent = styled.div`
  background: var(--bg-element2);
  padding: 20px;
  width: 30%;
  @media (max-width: 768px) {
    width: 60%;
  }
  max-width: 600px;
  border-radius: 8px;
`

const CloseButton = styled.span`
  color: var(--text1);
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
`

const ModalWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
`

const Warning = styled.img`
  width: 20%;
  @media (max-width: 768px) {
    width: 35%;
  }
`

const Server = styled.span`
  color: var(--text1);
  font-weight: bold;
  font-size: 20px;
`

const ModalText = styled.p`
  font-size: 16px;
  text-align: center;
  @media (max-width: 768px) {
    font-size: 12px;
    text-align: center;
  }
  line-height: 1.5;
`
const Ex = styled.span`
  font-size: 10px;
  text-align: center;
  color: var(--primary2);
  @media (max-width: 768px) {
    font-size: 8px;
    text-align: center;
  }
`

const Modal: FC<ModalProps> = ({ isOpen, onClose }) => {
  const [isModalClosed, setIsModalClosed] = useState(false)

  useEffect(() => {
    const isModalClosedStored = localStorage.getItem('isModalClosed')
    if (isModalClosedStored) {
      setIsModalClosed(true)
    }
  }, [])

  const handleOverlayClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (event.target === event.currentTarget) {
      onClose()
      //localStorage.setItem('isModalClosed', 'true')
      setIsModalClosed(true)
    }
  }

  const handleModalClose = () => {
    onClose()
    localStorage.setItem('isModalClosed', 'true')
    setIsModalClosed(true)
  }

  if (isModalClosed) {
    return null
  }

  return (
    <ModalOverlay isOpen={isOpen} onClick={handleOverlayClick}>
      <ModalContent>
        <CloseButton onClick={handleModalClose}>&times;</CloseButton>
        <ModalWrap>
          <Warning src="https://cdn-icons-png.flaticon.com/512/1803/1803974.png"></Warning>
          <Server>서버 이전</Server>
          <ModalText>
            클라우드 타입 정책 변경으로 라즈베리파이 서버로 이전 예정입니다.
          </ModalText>
          <Ex>(조회수, 좋아요, 이전 글 다음 글 기능이 작동하지 않습니다)</Ex>
        </ModalWrap>
      </ModalContent>
    </ModalOverlay>
  )
}

export default Modal
