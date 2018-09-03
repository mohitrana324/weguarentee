import Latest from './latest';
import Featured from './featured';

import {DrawerNavigator, TabNavigator, StackNavigator} from 'react-navigation';

const tabs = TabNavigator({
  latest: { screen: Latest},
  featured: { screen: Featured}
});

export default tabs;