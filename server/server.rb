require 'sinatra'
require 'json'

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
get '/users' do
  [
    {:id => 1, :name => 'Dan'},
    {:id => 2, :name => 'Ella'},
    {:id => 3, :name => 'Ava'}
  ].to_json
end

get '/broken' do
  500
end