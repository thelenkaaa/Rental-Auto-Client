"""Add image column to cars

Revision ID: a8236a99f5d2
Revises: e1a137c364f0
Create Date: 2023-03-31 18:11:06.218713

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql


# revision identifiers, used by Alembic.
revision = 'a8236a99f5d2'
down_revision = 'e1a137c364f0'
branch_labels = None
depends_on = None



def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
                    sa.Column('user_id', mysql.INTEGER(), autoincrement=True, nullable=False),
                    sa.Column('username', mysql.VARCHAR(length=255), nullable=False),
                    sa.Column('first_name', mysql.VARCHAR(length=255), nullable=False),
                    sa.Column('last_name', mysql.VARCHAR(length=255), nullable=False),
                    sa.Column('email', mysql.VARCHAR(length=255), nullable=False),
                    sa.Column('password', mysql.VARCHAR(length=255), nullable=False),
                    sa.Column('phone', mysql.VARCHAR(length=255), nullable=False),
                    sa.Column('drive_license', mysql.VARCHAR(length=255), nullable=False),
                    sa.PrimaryKeyConstraint('user_id'),
                    mysql_collate='utf8mb4_0900_ai_ci',
                    mysql_default_charset='utf8mb4',
                    mysql_engine='InnoDB'
                    )
    op.create_index('username', 'users', ['username'], unique=False)
    op.create_index('email', 'users', ['email'], unique=False)
    op.create_table('cars',
                    sa.Column('car_id', mysql.INTEGER(), autoincrement=True, nullable=False),
                    sa.Column('mark', mysql.VARCHAR(length=255), nullable=False),
                    sa.Column('category', mysql.VARCHAR(length=255), nullable=False),
                    sa.Column('price', mysql.INTEGER(), autoincrement=False, nullable=False),
                    sa.Column('transmission', mysql.VARCHAR(length=255), nullable=False),
                    sa.Column('status', mysql.VARCHAR(length=255), nullable=False),
                    sa.Column('image_path', mysql.VARCHAR(length=255), nullable=False),
                    sa.PrimaryKeyConstraint('car_id'),
                    mysql_collate='utf8mb4_0900_ai_ci',
                    mysql_default_charset='utf8mb4',
                    mysql_engine='InnoDB'
                    )
    op.create_table('orders',
                    sa.Column('order_id', mysql.INTEGER(), autoincrement=True, nullable=False),
                    sa.Column('renttime', mysql.DATETIME(), nullable=False),
                    sa.Column('renttime_start', mysql.DATETIME(), nullable=False),
                    sa.Column('renttime_end', mysql.DATETIME(), nullable=False),
                    sa.Column('user_id', mysql.INTEGER(), autoincrement=False, nullable=True),
                    sa.Column('car_id', mysql.INTEGER(), autoincrement=False, nullable=True),
                    sa.Column('payment', mysql.INTEGER(), autoincrement=False, nullable=False),
                    sa.ForeignKeyConstraint(['car_id'], ['cars.car_id'], name='orders_ibfk_1'),
                    sa.ForeignKeyConstraint(['user_id'], ['users.user_id'], name='orders_ibfk_2'),
                    sa.PrimaryKeyConstraint('order_id'),
                    mysql_collate='utf8mb4_0900_ai_ci',
                    mysql_default_charset='utf8mb4',
                    mysql_engine='InnoDB'
                    )
    op.create_table('jwt',
                    sa.Column('token_id', mysql.INTEGER(), autoincrement=True, nullable=False),
                    sa.Column('token', mysql.VARCHAR(length=300), nullable=False),
                    sa.PrimaryKeyConstraint('token_id'),
                    mysql_collate='utf8mb4_0900_ai_ci',
                    mysql_default_charset='utf8mb4',
                    mysql_engine='InnoDB'
                    )

    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###

    op.drop_table('jwt')
    op.drop_table('orders')
    op.drop_table('cars')
    op.drop_index('email', table_name='users')
    op.drop_index('username', table_name='users')
    op.drop_table('users')
    # ### end Alembic commands ###
