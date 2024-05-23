export const adminMenu = [
    { //Quản lý người dùng
        name: 'menu.admin.manage-user', menus: [
            {
                name: 'menu.admin.crud', link: '/system/user-manage',
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
                // ]
            },
            {
                name: 'menu.admin.crud-redux', link: '/system/user-redux',
            },
            {
                name: 'menu.admin.manage-admin', link: '/system/user-admin',
            },

            {
                name: 'menu.admin.manage-doctor', link: '/system/manage-doctor',
            },
            {
                name: 'menu.doctor.schedule', link: '/system/doctor-schedule-manage',
            },

        ],


    },
    {
        //Quản lý phòng khám
        name: 'menu.admin.clinic', menus: [{
            name: 'menu.admin.manage-clinic', link: '/system/clinic-manage'
        }]
    },
    {
        //Quản lý chuyên khoa
        name: 'menu.admin.specialty', menus: [{
            name: 'menu.admin.manage-specialty', link: '/system/specialty-manage'
        }]
    },
    {
        //Quản lý bài đăng
        name: 'menu.admin.hand-book', menus: [{
            name: 'menu.admin.manage-hand-book', link: '/system/hand-book-manage'
        }]
    },

];

export const doctorMenu = [
    { //Quản lý kế hoạch khám bệnh
        name: 'menu.admin.manage-user',
        menus: [
            { name: 'menu.doctor.schedule', link: '/doctor/manage-schedule' },
        ],
    },


];