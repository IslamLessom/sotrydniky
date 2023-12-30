import React, {useState} from 'react'
import { EmployeeForm } from '../../components/employee-form'
import { Layout } from '../../components/layout'
import { Row } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useAddEmployeesMutation } from '../../app/services/employess'

export const AddEmployee = () => {
  const [error, setError] = useState()
  const navigate = useNavigate()
  const user = useSelector()
  const [addEmployee] = useAddEmployeesMutation()
  const handleAddEmployee = () => {

  }
  return (
    <Layout>
      <Row align='middle' justify='center'>
        <EmployeeForm 
          title="Добавить сотрудника"
          btnText="Добавить"
          onFinish={handleAddEmployee}
          error={error}
        />
      </Row>
    </Layout>
  )
}
