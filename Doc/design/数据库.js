// DB Design

// collection user
{
	id: _id,
	name: '____',
	mail: '____',
	pass: '____'
}

// collection project
{
	id: _id,
	builder : _id,
	name: '____',
	public: true,
	members: [_id, _id, _id],
	created: Date
}

// collection doc
{
	id: _id,
	project_id: _id,
	name: '____',
	public: true,
	synergic: false,
	created: Date
}
// collection chapter
{
	id: _id,
	doc_id: _id,
	title: '___',
	created: Date,
	sections: [_id, _id, _id]
}

// collection section
{
	id: _id,
	chapter_id: _id,
	type: '____',
	label: '____',
	content: '_____'
}

