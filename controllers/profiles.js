const express = require('express')

const { Profile } = require('../models/schema')
const ref = require('objection').ref;

const router = express.Router()

router.get('/', async (req, res) => {
  const profiles = await Profile.query().select('profile')
  res.json(profiles)
})

router.get('/:id', async (req, res) => {
  const profile = await Profile.query().select('profile').where(ref('profiles.profile:id'), '=', req.params.id)
  res.json(Array.isArray(profile) ? profile[0]: {})
})

router.post('/', async (req, res) => {
  const data = req.body

  const profile = await Profile.query().insertGraph(data)

  res.send(profile)
})


router.delete('/:id', async (req, res) => {
  await Profile.query().deleteById(req.params.id)
  res.send(200)
})

module.exports = router