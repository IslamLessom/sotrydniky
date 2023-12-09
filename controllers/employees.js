const { prisma } = require('../prisma/prisma-client')

const all = async (req, res) => {
    try {
        const employees = await prisma.employee.findMany()

        res.status(200).json(employees)
    } catch (error) {
        res.status(500).json({ message: 'Не удалось получить сотрудников ' })
    }
}

const add = async (req, res) => {
    try {
        const data = req.body

        if (!data.firstName || !data.lastName || !data.adress || !data.age) {
            return res.status(400).json({ message: 'Заполните все поля' })
        }
        /*
        await prisma.user.update({
            where: {
                id: req.user.id,
            },
            data: {
                createdEmployee: {
                    create: data
                }
            }
        })
        */

        const employee = await prisma.employee.create({
            data: {
                ...data,
                userId: req.user.id
            }
        })

        return res.status(201).json(employee)

    } catch (error) {
        res.status(500).json({ message: 'Не удалось создать сотрудника ' })
    }
}

module.exports = {
    all,
    add
}