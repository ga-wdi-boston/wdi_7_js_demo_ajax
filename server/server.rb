require 'sinatra'
require 'json'

users = [
  {:id => 1, :name => 'Dan'},
  {:id => 2, :name => 'Ella'},
  {:id => 3, :name => 'Ava'}
]

before do
  content_type :json
  
  # allow CORS requests
  headers 'Access-Control-Allow-Origin' => '*', 
    'Access-Control-Allow-Methods' => ['OPTIONS', 'GET', 'POST', 'PUT', 'DELETE'],
    'Access-Control-Allow-Headers' => 'Content-Type'
end

# handle errors
error 500 do
  'Something went wrong!'
end

# routes
options '*' do
  200
end

get '/users' do
  users.to_json
end

post '/users' do
  user = JSON.parse(request.env['rack.input'].read)
  
  users << user
  
  response['Location'] = "/users/#{user['id']}"
  response.body = user.to_json
  response.status = 201
end

get '/broken' do
  500
end