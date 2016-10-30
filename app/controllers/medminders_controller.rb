class MedmindersController < ApplicationController
  def index
    @medminders = { medminders: [] }
  end
end
