import { AddAccountRepository } from '../../../../data/protocols/add-account-repository'
import {
  AddAccountModel,
  AccountModel
} from '../../../../presentation/controllers/signup/signup-protocols'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    const account = result.ops[0]
    const { _id, ...AccountWithoudId } = account
    return Object.assign({}, AccountWithoudId, { id: _id })
  }
}
