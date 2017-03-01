import ShopList from './ShopList';
import ShopEdit from './ShopEdit';
import ShopAdd from './ShopAdd';
import ShopView from './ShopView';

export default [
	{
		path: 'shop/list',
		component: ShopList
	},
	{
		path: 'shop/edit/:id',
		component: ShopEdit
	},
  {
    path: 'shop/view/:id',
    component: ShopView
  },
	{
		path: 'shop/add',
		component: ShopAdd
	}
];
