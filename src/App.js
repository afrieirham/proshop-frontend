import React from 'react'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { Container } from 'react-bootstrap'
import Footer from './components/Footer'
import Header from './components/Header'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import OrderListScreen from './screens/OrderListScreen'
import RegisterChildScreen from './screens/RegisterChildScreen'
import PrivateRoute from './components/PrivateRoute'
import GuestRoute from './components/GuestRoute'

function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Switch>
            <Route exact path='/search/:keyword/page/:pageNumber' component={HomeScreen} />
            <Route exact path='/search/:keyword' component={HomeScreen} />
            <Route exact path='/page/:pageNumber' component={HomeScreen} />
            <Route exact path='/' component={HomeScreen} />
            <PrivateRoute admin path='/admin/orders' component={OrderListScreen} />
            <PrivateRoute admin path='/admin/users/:id/edit' component={UserEditScreen} />
            <PrivateRoute admin path='/admin/users' component={UserListScreen} />
            <PrivateRoute admin exact path='/admin/products/:id/edit' component={ProductEditScreen} />
            <PrivateRoute admin exact path='/admin/products/:pageNumber' component={ProductListScreen} />
            <PrivateRoute admin exact path='/admin/products' component={ProductListScreen} />
            <PrivateRoute path='/profile' component={ProfileScreen} />
            <GuestRoute exact path='/register' component={RegisterScreen} />
            <GuestRoute path='/register/:token' component={RegisterChildScreen} />
            <GuestRoute path='/login' component={LoginScreen} />
            <PrivateRoute path='/shipping' component={ShippingScreen} />
            <PrivateRoute path='/payment' component={PaymentScreen} />
            <PrivateRoute path='/place-order' component={PlaceOrderScreen} />
            <PrivateRoute path='/order/:id' component={OrderScreen} />
            <Route path='/product/:id' component={ProductScreen} />
            <Route path='/cart/:id?' component={CartScreen} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
