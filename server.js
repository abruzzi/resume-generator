const axios = require('axios')
const _ = require('lodash')

const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

const headers = { headers: {'Authorization': `${process.env.JIGSAW_API_KEY}`} }

const basic = (id) => axios.get(`https://jigsaw.thoughtworks.net/api/people/${id}`, headers)
const skills = (id) => axios.get(`https://jigsaw.thoughtworks.net/api/people/${id}/skills`, headers)
const experience = (id) => axios.get(`https://jigsaw.thoughtworks.net/api/people/${id}/work_experiences`, headers)

const categorizeSkills = (skills) => {
	const grouped = _.groupBy(skills, 'group.name')
	return _.entries(grouped).map(([key, value]) => ({
		category: key, 
		description: _.map(value, 'name').join(', ')
	}))
}

const reshape = (basic, skills, experience) => {
	return {
		id: basic.employeeId,
		name: basic.preferredName,
		title: `${basic.role.name} / ${basic.grade.name}`,
		bio: [],
		skills: categorizeSkills(skills),
		experience: _.map(experience, e => ({
			project: e.project.name,
			role: '',
			description: []
		})),
		education: []
	}
}

server.get('/jigsaw/:id', (req, res) => {
	const id = req.params.id

	return axios.all([basic(id), skills(id), experience(id)])
  .then(axios.spread(function (basic, skills, experience) {
  	const data = reshape(basic.data, skills.data, experience.data)
    return res.json(data)
  }));
})

server.use(middlewares);
server.use(router);

server.listen(port, function () {
  console.log('JSON Server is running')
})