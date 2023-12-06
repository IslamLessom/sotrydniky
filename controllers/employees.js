const { prisma } = require('../prisma/prisma-client')

const all = async (req, res) => {
    try {
        const employees = await prisma.employee.findMany()

        res.status(200).json(employees)
    } catch (error) {
        res.status(400).json({message: 'Не удалось получить сотрудников '})
    }
}

module.exports = {
    all
}