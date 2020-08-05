// // //<<<<<<<<<<<<<<<<<<<<<<<< =MEMBER= >>>>>>>>>>>>>>>>>>>>>>>>>>>

  // // // localhost:3000/projectid/members/1
  // router.get('/:projectid/members', check.isLoggedIn, function (req, res, next) {
  //   let projectid = req.params.projectid
  //   let link = 'projects'
  //   let url = 'members'
  //   let sqlFilter = `SELECT COUNT(member) AS total FROM(SELECT members.userid FROM members JOIN users 
  //     ON members.userid = users.userid WHERE members.projectid = ${projectid}`;

  //   //Start Filter Search
  //   let result = []

  //   if (req.query.checkId && req.query.memberId) {
  //     result.push(`members.id=${req.query.memberId}`)
  //   }

  //   if (req.query.checkName && req.query.memberName) {
  //     result.push(`CONCAT(users.firstname,' ',users.lastname) LIKE '%${req.query.memberName}%'`)
  //   }

  //   if (req.query.checkPosition && req.query.position) {
  //     result.push(`members.role = '${req.query.position}'`)
  //   }

  //   if (result.length > 0) {
  //     sqlFilter += ` AND ${result.join(' AND ')}`
  //   }
  //   sqlFilter += `) AS member`
  //   //End Search Member

  //   db.query(sqlFilter, (err, totalData) => {
  //     if (err) return res.status(500).json({
  //       error: true,
  //       message: err
  //     })

  //     //Start Pagination Member
  //     const urlpage = (req.url == `/${projectid}/members`) ? `/${projectid}/members/?page=1` : req.url;
  //     const page = req.query.page || 1;
  //     const limit = 5;
  //     const offset = (page - 1) * limit;
  //     const total = totalData.rows[0].total;
  //     const pages = Math.ceil(total / limit);

  //     let sqlMember = `SELECT users.userid, projects.name, projects.projectid, members.id, members.role, 
  //     CONCAT(users.firstname,' ',users.lastname) AS fullname FROM members
  //     LEFT JOIN projects ON projects.projectid = members.projectid
  //     LEFT JOIN users ON users.userid = members.userid WHERE members.projectid = ${projectid}`

  //     if (result.length > 0) {
  //       sqlMember += ` AND ${result.join(' AND ')}`
  //     }
  //     sqlMember += ` ORDER BY members.id ASC`
  //     sqlMember += ` LIMIT ${limit} OFFSET ${offset}`
  //     //End Pagination Member

  //     db.query(sqlMember, (err, dataMamber) => {
  //       if (err) return res.status(500).json({
  //         error: true,
  //         message: err
  //       })

  //       let sqlProject = `SELECT * FROM projects WHERE projectid = ${projectid}`

  //       db.query(sqlProject, (err, dataProject) => {
  //         if (err) return res.status(500).json({
  //           error: true,
  //           message: err
  //         })

  //         res.render('projects/members/listMember', {
  //           projectid,
  //           link,
  //           url,
  //           pages,
  //           page,
  //           urlpage,
  //           project: dataProject.rows[0],
  //           members: dataMamber.rows,
  //           option: optionMember,
  //           login: req.session.user
  //         })
  //       })
  //     })
  //   })
  // });

  // // localhost:3000/projectid/members/option
  // router.post('/:projectid/members/option', check.isLoggedIn, (req, res) => {

  //   const projectid = req.params.projectid

  //   optionMember.id = req.body.checkid;
  //   optionMember.name = req.body.checkname;
  //   optionMember.position = req.body.checkposition;
  //   res.redirect(`/projects/${projectid}/members`)
  // })

  // // localhost:3000/projectid/members/add 
  // router.get('/:projectid/members/add', check.isLoggedIn, function (req, res, next) {
  //   const projectid = req.params.projectid
  //   const link = 'projects'
  //   const url = 'members'
  //   let sqlProject = `SELECT * FROM projects WHERE projectid = ${projectid}`
  //   db.query(sqlProject, (err, dataProject) => {
  //     if (err) return res.status(500).json({
  //       error: true,
  //       message: err
  //     })
  //     let sqlMember = `SELECT userid, CONCAT(firstname,' ',lastname) AS fullname FROM users
  //     WHERE userid NOT IN (SELECT userid FROM members WHERE projectid = ${projectid})`

  //     db.query(sqlMember, (err, dataMember) => {
  //       if (err) return res.status(500).json({
  //         error: true,
  //         message: err
  //       })
  //       res.render('projects/members/add', {
  //         members: dataMember.rows,
  //         project: dataProject.rows[0],
  //         projectid,
  //         link,
  //         url,
  //         login: req.session.user
  //       })
  //     })
  //   })
  // });

  // // localhost:3000/projectid/members/add method:post
  // router.post('/:projectid/members/add', check.isLoggedIn, function (req, res, next) {
  //   const projectid = req.params.projectid
  //   const { inputmember, inputposition } = req.body
  //   let sqlAdd = `INSERT INTO members(userid, role, projectid) VALUES ($1,$2,$3)`
  //   let values = [inputmember, inputposition, projectid]

  //   db.query(sqlAdd, values, (err) => {
  //     if (err) return res.status(500).json({
  //       error: true,
  //       message: err
  //     })
  //     res.redirect(`/projects/${projectid}/members`)
  //   })
  // });

  // // localhost:3000/projects/members/:id/edit/2
  // router.get('/:projectid/members/:id', check.isLoggedIn, function (req, res, next) {
  //   let projectid = req.params.projectid;
  //   let id = req.params.id

  //   let sqlMember = `SELECT members.id, CONCAT(users.firstname,' ',users.lastname) AS fullname, members.role FROM members
  //   LEFT JOIN users ON members.userid = users.userid WHERE projectid=${projectid} AND id=${id}`

  //   db.query(sqlMember, (err, dataMember) => {
  //     if (err) return res.status(500).json({
  //       error: true,
  //       message: err
  //     })

  //     let member = dataMember.rows[0]
  //     let sqlProject = `SELECT * FROM projects WHERE projectid= ${projectid}`

  //     db.query(sqlProject, (err, dataProject) => {
  //       if (err) return res.status(500).json({
  //         error: true,
  //         message: err
  //       })

  //       let project = dataProject.rows[0]

  //       res.render('projects/members/edit', {
  //         projectid,
  //         link: 'projects',
  //         url: 'members',
  //         member,
  //         project,
  //         login: req.session.user
  //       })
  //     })
  //   })
  // });

  // // localhost:3000/projects/members/:id/edit/2 method:post
  // router.post('/:projectid/members/:id', check.isLoggedIn, function (req, res, next) {
  //   let projectid = req.params.projectid
  //   let id = req.params.id;
  //   let position = req.body.inputposition;

  //   let sql = `UPDATE members SET role='${position}' WHERE id=${id}`

  //   db.query(sql, (err) => {
  //     if (err) return res.status(500).json({
  //       error: true,
  //       message: err
  //     })
  //     res.redirect(`/projects/${projectid}/members`)
  //   })
  // });


  // // localhost:3000/projects/delete/projectid1 method:get
  // router.get('/:projectid/members/:id/delete', check.isLoggedIn, function (req, res, next) {
  //   let projectid = req.params.projectid
  //   //let id = req.params.id;
  //   let sql = `DELETE FROM members WHERE projectid=${projectid}`

  //   db.query(sql, (err) => {
  //     if (err) return res.status(500).json({
  //       error: true,
  //       message: err
  //     })

  //     let sql2 = `DELETE FROM projects WHERE projectid=${projectid}`
  //     db.query(sql2, (err) => {
  //       if (err) return res.status(500).json({
  //         error: true,
  //         message: err
  //       })

  //       res.redirect('/projects')
  //     })



  //res.redirect(`/projects/${projectid}/members`)
  //   })
  // })

  // // localhost:3000/projects/activity/1
  // router.get('/activity/:projectid', helpers.isLoggedIn, function (req, res, next) {
  //     res.render('projects/activity/view')
  // });

  // // localhost:3000/projects/issues/1
  // router.get('/issues/:projectid', helpers.isLoggedIn, function (req, res, next) {
  //     res.render('projects/issues/list')
  // });

  // // localhost:3000/projects/issues/1/add
  // router.get('/issues/:projectid/add', helpers.isLoggedIn, function (req, res, next) {
  //     res.render('projects/issues/add')
  // });

  // // localhost:3000/projects/issues/1/add method:post
  // router.post('/issues/:projectid/add', helpers.isLoggedIn, function (req, res, next) {
  //     res.redirect(`/projects/issues/${req.params.projectid}`)
  // });

  // // localhost:3000/projects/issues/1/edit/2
  // router.get('/issues/:projectid/edit/:issueid', helpers.isLoggedIn, function (req, res, next) {
  //     res.render('projects/issues/edit')
  // });

  // // localhost:3000/projects/issues/1/edit/2 method:post
  // router.post('/issues/:projectid/edit/:issueid', helpers.isLoggedIn, function (req, res, next) {
  //     res.redirect(`/projects/issues/${req.params.projectid}`)
  // });

  // // localhost:3000/projects/issues/1/delete/2
  // router.get('/issues/:projectid/delete/:issueid', helpers.isLoggedIn, function (req, res, next) {
  //     res.redirect(`/projects/issues/${req.params.projectid}`)
  // });
