class MedmindersController < ApplicationController
  def index
    @medminders = Medminder.all
  end

  def edit
    @medminder = Medminder.find(params[:id])
  end

  def create
    @medminder = Medminder.new(
      title: params[:title],
      frequency: params[:freqStr],
      time: params[:time],
      start_date: params[:startDate]
    )
    if @medminder.save
      render json: {response: "success!", minder: @medminder}, status: 200
    else
      render json: {response: "fail!"}, status: 400
    end
  end

  def destroy
    @medminder = Medminder.find(params[:id])
    @medminder.destroy
    render json: {response: "success!"}, status: 200
  end
end
