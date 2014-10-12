// RESTFull design

// Page
GET		/												index.html
GET		/project/:id 						project.html
GET		/project/:id/doc/:id 		doc.html

// Ajax
GET		/p/:id 					<<<		{ Project }
GET		/p/:id/d/:id 		<<<		{ Doc }

POST	/p/:id/d/:id/c  >>>		{ }						<<<		id
POST	/p/:id/d/:id/c/:id/s 								<<<		id
POST	/c/:id 					>>>		{ Chapter }		<<<		ok
POST	/c/:id/delete 	>>>									<<<		ok
POST	/s/:id 					>>>		{ Section }		<<<		ok
POST	/s/:id/delete 	>>>									<<<		ok