import { Box, Button, Modal } from '@mui/material'
import React from 'react'

interface Props {
    open: boolean
    mainText: string
    buttonLeftText: string
    buttonRightText: string
    handleClose: () => void
    handleRightButton: () => void
}

export default function BasicModal({ open, mainText, buttonLeftText, buttonRightText, handleClose, handleRightButton }: Props) {
    return (
        <Modal
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                style={{
                    position: 'relative',
                    width: '400px',
                    height: '200px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '24px',
                    backgroundColor: '#f4f4f4',
                    borderRadius: '4px'
                }}
                sx={{
                    ':focus-visible': {
                        outline: 'none'
                    }
                }}
            >
                <p style={{ marginBottom: '64px', fontSize: '18px', fontWeight: '500', textAlign: 'center', lineHeight: '23px' }}>
                    {mainText}
                </p>
                <div style={{ position: 'absolute', bottom: '0px', display: 'flex', width: '100%', padding: '32px', gap: '8px' }}>
                    <Button
                        onClick={handleClose}
                        style={{
                            flex: 1,
                            borderRadius: 0,
                            boxShadow: 'none',
                            borderBottomLeftRadius: '4px',
                            color: '#fff',
                            fontSize: '16px',
                            fontWeight: '500',
                            backgroundColor: '#aaa'
                        }}
                        variant="contained"
                    >
                        {buttonLeftText}
                    </Button>
                    <Button
                        onClick={handleRightButton}
                        style={{
                            flex: 1,
                            borderRadius: 0,
                            boxShadow: 'none',
                            borderBottomRightRadius: '4px',
                            color: '#fff',
                            fontSize: '16px',
                            fontWeight: '500'
                        }}
                        variant="contained"
                        color="error"
                    >
                        {buttonRightText}
                    </Button>
                </div>
            </Box>
        </Modal>
    )
}
