import React from 'react'
import { View, Text } from 'react-native'

export default function If({show, children}) {
    return (
        <>
          {show ? children : null}
        </>
    )
}
