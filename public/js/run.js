/*
* @Author: Artur Atnagulov (ClienDDev team)
*/

import ReactDOM from 'react-dom';
import Root from 'components/root';

jQuery(document).ready(function($) {
	ReactDOM.render(React.createElement(Root, null), document.getElementById('root'));
});
