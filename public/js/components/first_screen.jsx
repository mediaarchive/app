/*
* @Author: Artur Atnagulov (ClienDDev team)
*/

class FirstScreen extends React.Component {
	render(){
		let date = new Date();
		let year = date.getFullYear();

		return 
		(<div className="lockscreen-wrapper">
	        <div className="lockscreen-logo">
	            <a href="#">
	                <i className="fa fa-folder"></i><br/>
	                Медиаархив
	            </a>
	            <br/>
	            <small>загрузка приложения...</small>
	        </div>
	        <hr/>
	        <div className="lockscreen-footer text-center">
	            &copy; 2015-{year} <a href="http://clienddev.ru">ClienDDev team</a> & others<br/>
	        </div>
	    </div>)
	}
}