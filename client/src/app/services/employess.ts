import { Employee } from "@prisma/client"
import { api } from './api'


export const employeesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllEmployees: builder.query<Employee[], void>({
            query: () => ({
                url: '/employees',
                metgod: 'GET'
            })
        }),
        getEmployees: builder.query<Employee[], string>({
            query: (id) => ({
                url: `/employees/${id}`,
                metgod: 'GET'
            })
        }),
        editEmployees: builder.mutation<string, Employee>({
            query: (employee) => ({
                url: `/employees/edit/${employee.id}`,
                metgod: 'PUT'
            })
        }),
        removeEmployees: builder.mutation<string, string>({
            query: (id) => ({
                url: `/employees/remove/${id}`,
                metgod: 'POST',
                body: { id }
            })
        }),
        addEmployees: builder.mutation<Employee, Employee>({
            query: (employee) => ({
                url: `/employees/add}`,
                metgod: 'POST',
                body: employee
            })
        }),
    })
})

export const {
    useGetAllEmployeesQuery,
    useAddEmployeesMutation,
    useEditEmployeesMutation,
    useGetEmployeesQuery,
    useRemoveEmployeesMutation
} = employeesApi

export const {
    endpoints: {
        getAllEmployees,
        getEmployees,
        editEmployees,
        removeEmployees,
        addEmployees
    }
} = employeesApi