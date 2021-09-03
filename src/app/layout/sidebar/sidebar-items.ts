import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
  {
    path: '',
    title: '-- Principal',
    moduleName: '',
    icon: '',
    class: '',
    groupTitle: true,
    submenu: []
  },

  {
    path: '/maestros/zonas',
    title: 'Zonas comerciales',
    moduleName: 'zonas',
    icon: 'far fa-file-alt',
    class: '',
    groupTitle: false,
    submenu: []
  },
  {
    path: '/maestros/productos',
    title: 'Productos',
    moduleName: 'productos',
    icon: 'far fa-file-alt',
    class: '',
    groupTitle: false,
    submenu: []
  },
  {
    path: '/maestros/clientes',
    title: 'Clientes',
    moduleName: 'clientes',
    icon: 'far fa-file-alt',
    class: '',
    groupTitle: false,
    submenu: []
  },
  {
    path: '/maestros/vendedores',
    title: 'Vendedores',
    moduleName: 'vendedores',
    icon: 'far fa-file-alt',
    class: '',
    groupTitle: false,
    submenu: []
  },
  {
    path: '/maestros/facturas',
    title: 'Facturas',
    moduleName: 'facturas',
    icon: 'far fa-file-alt',
    class: '',
    groupTitle: false,
    submenu: []
  },
  {
    path: '/maestros/visitas',
    title: 'Visitas',
    moduleName: 'visitas',
    icon: 'far fa-file-alt',
    class: '',
    groupTitle: false,
    submenu: []
  },
  // {
  //   path: '/maestros/usuario',
  //   title: 'Usuarios',
  //   moduleName: 'maestros',
  //   icon: '',
  //   class: 'ml-menu',
  //   groupTitle: false,
  //   submenu: []
  // },
  // {
  //   path: '/maestros/almacen',
  //   title: 'Almacen',
  //   moduleName: 'maestros',
  //   icon: '',
  //   class: 'ml-menu',
  //   groupTitle: false,
  //   submenu: []
  // },
  // {
  //   path: '/maestros/referencias',
  //   title: 'Referencias',
  //   moduleName: 'maestros',
  //   icon: '',
  //   class: 'ml-menu',
  //   groupTitle: false,
  //   submenu: []
  // },
  // {
  //   path: '/maestros/color',
  //   title: 'Color',
  //   moduleName: 'maestros',
  //   icon: '',
  //   class: 'ml-menu',
  //   groupTitle: false,
  //   submenu: []
  // },
  {
    path: '/maestros/cuentaPorCobrar',
    title: 'Cuenta por cobrar',
    moduleName: 'cuentasPorCobrar',
    icon: 'far fa-file-alt',
    class: '',
    groupTitle: false,
    submenu: []
  },
  {
    path: '/maestros/estadisticas',
    title: 'Estadisticas de venta',
    moduleName: 'estadisticas',
    icon: 'far fa-file-alt',
    class: '',
    groupTitle: false,
    submenu: []
  },

  // {
  //   path: '/inboxDespacho',
  //   title: 'Inbox despacho',
  //   moduleName: 'inbox despacho',
  //   icon: 'far fa-file-alt',
  //   class: '',
  //   groupTitle: false,
  //   submenu: []
  // }
];
