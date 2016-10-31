Rails.application.routes.draw do
  resources :medminders
  get 'medminders', to: 'medminders#index'

  root 'medminders#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
