export class NetworkInfo {
	static PROTOCOL = 'http://';
	static DOMAIN = '3.218.6.134:9082';
	static NETWORK = NetworkInfo.PROTOCOL + NetworkInfo.DOMAIN;
}

export class SubDomain {
	static USEROPERTIONAPI = '/UserOperationsAPI';
}

export class MethodType {
	static GET = '/get';
	static POST = '/post';
	static PUT = '/update';
	static DELETE = '/delete';
}

export class UserAPI {
	static LOGIN = '/AdminLogin';
	static LOGOUT = '/LogOut';
}