import { Router, Request, Response } from 'express';
import User, { IUser } from '../models/User';
import userController from '../controllers/userController';
import authenticationRequired from '../middlewares/authenticationRequired';

const router = Router();

router.get("/me", authenticationRequired, (request: Request, response: Response) => {
  if(!request.user) { return response.status(401).send() }
  return response.json((request.user as IUser).getSafeUser());
});

router.get('/:id', authenticationRequired, async (req: Request, res: Response) => { 
  const userId = req.params['id'];
  const user = await userController.findById(userId);

  if(user == null) { console.log('No user found') }

  res.send(user);
});

router.get('/', (req: Request, res: Response) => {
  const skip: number = req.query.skip ? +req.query.skip : 0;
  const limit: number = req.query.limit ? +req.query.limit : 3;
  User.find({}, '_id email firstname lastname').skip(skip).limit(limit)
    .then(users => {
      return res.status(200).send(users);
    })
    .catch(error => {
      return res.status(500).send();
    })
});

router.post('/', async (req: Request, res: Response) => {
  const newUser = await userController.create(req.body);

  res.status(200).send(newUser);
});

router.patch('/:id', async (req: Request, res: Response) => {
  const userId = req.params['id'];
  // const {email, firstname, lastname} = req.body;

  const updatedUser = await userController.findByIdAndUpdate(userId, req.body)
  res.send('User updated');
})

router.patch('/', authenticationRequired, async (req: Request, res: Response) => {
  if(!req.user) { return res.status(401).send() }
  const { email, firstname, lastname, password } = req.body;
  

  userController.updateUser(req.user as IUser, email, firstname, lastname, password)
    .then(user => {
      if(!user) return res.status(404).send("User not found");
      return res.status(200).send(user.getSafeUser());
    })
    .catch(error => {
      console.error(error);
      return res.status(500).send();
    });
})

router.delete('/', authenticationRequired, (req: Request, res: Response) => {
  if(!req.user) { return res.status(401).send() }
  (req.user as IUser).deleteOne()
    .then(_user => res.status(200).send('User deleted'))
    .catch(error => {
      console.error(error);
      return res.status(500).send();
    });
})

export default router;