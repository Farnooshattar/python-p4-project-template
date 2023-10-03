"""adds an in_cart column

Revision ID: 29dcd6ee417b
Revises: a44895b4f391
Create Date: 2023-10-03 12:21:16.573466

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '29dcd6ee417b'
down_revision = 'a44895b4f391'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('events', schema=None) as batch_op:
        batch_op.add_column(sa.Column('in_cart', sa.Integer(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('events', schema=None) as batch_op:
        batch_op.drop_column('in_cart')

    # ### end Alembic commands ###
