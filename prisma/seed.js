const bcrypt = require('bcryptjs')
const {PrismaClient, Role} = require('@prisma/client')
const { table } = require('../models/db')
const prisma = new PrismaClient()

const password = bcrypt.hashSync('123456')
const userData = [
    {username : 'namtip', password: password, firstname: 'sureelux', lastname : 'pangkhamhak',address : '999 Nakonphanom',phone : '0999999999', email : 'sureelux2545@gmail.com'},
    {username : 'tip', password: password, firstname: 'namtip', lastname : 'pangkhamhak',address : '888 Nakonphanom',phone : '098888888', email : 'sureelux2545@gmail.com'},
    {username : 'user2', password: password, firstname: 'namtip', lastname : 'pangkhamhak',address : '888 Nakonphanom',phone : '098888888', email : 'sureelux2545@gmail.com'},
    {username : 'user', password: password, firstname: 'namtip', lastname : 'pangkhamhak',address : '888 Nakonphanom',phone : '098888888', email : 'sureelux2545@gmail.com'},
    {username : 'k', password: password, firstname: 'k', lastname : 'k',address : '888 Nakonphanom',phone : '098888888', email : 'k@mail.com', role: "ADMIN"}
]

const typeData = [
    {type_name : 'โต๊ะธรรมดา'},
    {type_name : 'โต๊ะ VIP'},
]

const tableData = [
    {table_img : 'https://nocnoc.com/blog/wp-content/uploads/2021/03/14-dining-table-decorate.jpg', table_name : 'T03', table_status : 'FREE' ,table_seat : 10, table_price : 500 , typeId : 1},
    {table_img : 'https://nocnoc.com/blog/wp-content/uploads/2021/03/01-dining-table-decorate.jpg', table_name : 'T01', table_status : 'FREE' ,table_seat : 8, table_price : 1500 , typeId : 1}
]

// const todoData = [
//     { title:'Learn HTML', duedate: new Date(), userId: 7},
//     { title:'Learn CSS', duedate: new Date(), userId: 4},
//     { title:'Learn JS', duedate: new Date(), userId: 8},
//     { title:'Learn React', duedate: new Date(), userId: 9}
// ]


const run = async() => {      
    await prisma.user.createMany({
        data: userData
    })

    // await prisma.type_Table.createMany({
    //     data: typeData
    // })

    // await prisma.table.createMany({
    //     data: tableData
    // })
    
   
}

run()