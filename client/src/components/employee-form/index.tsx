import { Employee } from "@prisma/client"
import { Card } from "antd"

type Props<T> = {
  onFinish: (value: T) => void
  btnText: string
  title: string
  error?: string
  employee?: string
}

export const EmployeeForm = ({
  onFinish,
  title,
}:Props<Employee>) => {
  return (
    <Card title={title} style={{width: '30rem'}}>

    </Card>
  )
}
