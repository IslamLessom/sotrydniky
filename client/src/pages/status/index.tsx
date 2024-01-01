import { Button, Result, Row } from 'antd'
import React from 'react'
import { Link, useParams } from 'react-router-dom'

const Statuses: Record<string, string> = {
    created: 'Прльзователь успешно создан',
    updated: 'Прльзователь успешно обновлен',
    deleted: 'Прльзователь успешно удален'
}

export const Status = () => {
    const { status } = useParams()
    return (
        <Row align='middle' justify='center' style={{width: '100%'}}>
            <Result 
                status={status ? 'success' : 404}
                title={status ? Statuses[status] : 'Не найдено'}
                extra={
                    <Button key="dashboard">
                        <Link to='/'>На главную</Link>
                    </Button>
                }
            />
        </Row>
    )
}
