import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import Link from '@mui/material/Link'
import Typography, { TypographyProps } from '@mui/material/Typography'

interface CopyrightProps extends TypographyProps {
  text: string
}

const Copyright: FC<CopyrightProps> = ({ text, ...typographyProps }) => {
  const navigate = useNavigate()
  return (
    <Typography variant='body2' color='text.secondary' align='center' {...typographyProps}>
      {'Copyright © '}
      <Link color='inherit' style={{ cursor: 'pointer' }} onClick={() => navigate('/copyrights')}>
        {text}
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

export default Copyright
