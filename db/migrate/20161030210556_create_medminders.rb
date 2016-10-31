class CreateMedminders < ActiveRecord::Migration[5.0]
  def change
    create_table :medminders do |t|
      t.string :title
      t.string :frequency
      t.string :time
      t.string :start_date

      t.timestamps
    end
  end
end
