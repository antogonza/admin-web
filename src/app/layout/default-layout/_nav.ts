import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
  },
  {
    title: true,
    name: 'Pedidos'
  },
  {
    name: 'Pedidos de Hoy',
    url: '/orders/today',
    iconComponent: { name: 'cil-notes' }
  },
  {
    name: 'Todos los pedidos',
    url: '/orders/all',
    iconComponent: { name: 'cil-pencil' }
  },
  {
    name: 'Otros locales',
    url: '/orders/locals',
    iconComponent: {
      name: 'cil-location-pin'
    }
  },
  {
    name: 'Otros',
    title: true
  },
  {
    name: 'Productos',
    url: '/products',
    iconComponent: {
      name: 'cilPizza'
    }
  },
  {
    name: 'Promociones',
    url: '/promos',
    iconComponent: {
      name: 'cil-credit-card'
    }
  },
];
